import AABB from "../../Wolfie2D/DataTypes/Shapes/AABB";
import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import GameEvent from "../../Wolfie2D/Events/GameEvent";
import { GameEventType } from "../../Wolfie2D/Events/GameEventType";
import Input from "../../Wolfie2D/Input/Input";
import GameNode, { TweenableProperties } from "../../Wolfie2D/Nodes/GameNode";
import { GraphicType } from "../../Wolfie2D/Nodes/Graphics/GraphicTypes";
import Rect from "../../Wolfie2D/Nodes/Graphics/Rect";
import AnimatedSprite from "../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import OrthogonalTilemap from "../../Wolfie2D/Nodes/Tilemaps/OrthogonalTilemap";
import Label from "../../Wolfie2D/Nodes/UIElements/Label";
import { UIElementType } from "../../Wolfie2D/Nodes/UIElements/UIElementTypes";
import RenderingManager from "../../Wolfie2D/Rendering/RenderingManager";
import Scene from "../../Wolfie2D/Scene/Scene";
import SceneManager from "../../Wolfie2D/Scene/SceneManager";
import Viewport from "../../Wolfie2D/SceneGraph/Viewport";
import Timer from "../../Wolfie2D/Timing/Timer";
import Color from "../../Wolfie2D/Utils/Color";
import { EaseFunctionType } from "../../Wolfie2D/Utils/EaseFunctions";
import PlayerController, { PlayerTweens } from "../Player/PlayerController";
import Rifle from "../Player/Rifle";
import Shotgun from "../Player/Shotgun";

import { GameEvents } from "../GameEvents";
import { GamePhysicsGroups } from "../GamePhysicsGroups";
import HW3FactoryManager from "../Factory/HW3FactoryManager";
import MainMenu from "./MainMenu";
import Particle from "../../Wolfie2D/Nodes/Graphics/Particle";
import Button from "../../Wolfie2D/Nodes/UIElements/Button";
import Sprite from "../../Wolfie2D/Nodes/Sprites/Sprite";
import Grapple from "../Player/Grapple";
import Queue from "../../Wolfie2D/DataTypes/Queue";
import RatAI from "../NPC/Rat/RatAI";
import HW3AnimatedSprite from "../Nodes/HW3AnimatedSprite";


/**
 * A const object for the layer names
 */
export const LevelLayers = {
    BACKGROUND: "BACKGROUND",
    // The primary layer
    PRIMARY: "PRIMARY",
    // The UI layer
    UI: "UI",
    // The background layer

} as const;

// The layers as a type
export type LevelLayers = typeof LevelLayers[keyof typeof LevelLayers]

/**
 * An abstract HW4 scene class.
 */
export default abstract class Level extends Scene {

    /** Overrride the factory manager */
    public add: HW3FactoryManager;


    /** The particle system used for the player's rifle */
    protected rifleParticlesSystem: Rifle;
    protected shotgunParticlesSystem: Shotgun;
    protected grappleParticlesSystem: Grapple;
    /** The key for the player's animated sprite */
    protected playerSpriteKey: string;
    /** The animated sprite that is the player */
    protected player: AnimatedSprite;
    /** The player's spawn position */
    protected playerSpawn: Vec2;

    private healthBar: Label;
	private healthBarHealth: Label;
	private healthBarMissing: Label;


    /** The end of level stuff */

    protected levelEndPosition: Vec2;
    protected levelEndHalfSize: Vec2;

    protected levelEndArea: Rect;
    protected nextLevel: new (...args: any) => Scene;
    protected levelEndTimer: Timer;
    protected levelEndLabel: Label;

    // Level end transition timer and graphic
    protected levelTransitionTimer: Timer;
    protected levelTransitionScreen: Rect;

    /** The keys to the tilemap and different tilemap layers */
    protected tilemapKey: string;
    protected wallsLayerKey: string;
    /** The scale for the tilemap */
    protected tilemapScale: Vec2;
    /** The wall layer of the tilemap */
    protected walls: OrthogonalTilemap;

    // background image
    protected backgroundKey: string;

    /** Sound and music */
    protected levelMusicKey: string;
    protected jumpAudioKey: string;
    protected dyingAudioKey: string;

    // sets viewport dynamically for each level
    protected levelxbound: number;
    protected levelybound: number;

    protected backgroundImagePosition: Vec2;

    protected viewportBounds: Vec2;
    protected pauseButton: Button;

    protected kernel: Sprite;
    protected kernelSpriteKey: string;

    protected popcorn: Array<Sprite>;
    protected popcornSpriteKey: string;

    protected grappleQueue: Queue<Vec2>;

    protected ratSpriteKey: string;
    protected ratPositions: Array<Vec2>;

    protected birdSpriteKey: string;
    protected birdPositions: Array<Vec2>;
    protected birdDistance: number;

    protected bossSpriteKey: string;
    protected bossPosition: Vec2;

    public constructor(viewport: Viewport, sceneManager: SceneManager, renderingManager: RenderingManager, options: Record<string, any>) {
        super(viewport, sceneManager, renderingManager, {...options, physics: {
            groupNames: [
                GamePhysicsGroups.GROUND,
                GamePhysicsGroups.PLAYER,
                GamePhysicsGroups.RIFLE,
                GamePhysicsGroups.SHOTGUN,
                GamePhysicsGroups.GRAPPLE,
                GamePhysicsGroups.ENTITY,
            ],
            collisions: [
                [0, 1, 1, 1, 0, 1],
                [1, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 1],
                [1, 0, 1, 1, 1, 0]
            ]
         }});
        this.add = new HW3FactoryManager(this, this.tilemaps);
        this.load.image("pauseButton", "game_assets/images/pause_button.png");

    }

    public startScene(): void {
        this.initLayers();
        this.initializeBackground();
        this.initializeTilemap();
        this.initializeWeaponSystem();
        this.initializeUI();
        this.initializePlayer(this.playerSpriteKey);
        this.initializeNPCs();
        this.initializeViewport();
        this.subscribeToEvents();
        this.initializeLevelEnds();

        this.levelTransitionTimer = new Timer(500);
        this.levelEndTimer = new Timer(500, () => {
            // After the level end timer ends, fade to black and then go to the next scene
            this.levelTransitionScreen.tweens.play("fadeIn");
        });

        // Initially disable player movement
        Input.disableInput();

        // Start the black screen fade out
        this.levelTransitionScreen.tweens.play("fadeOut");
        
        // Start playing the level music for the HW4 level
        this.emitter.fireEvent(GameEventType.PLAY_MUSIC, {key: this.levelMusicKey, loop: true, holdReference: true});
    }

    /* Update method for the scene */

    public updateScene(deltaT: number) {
        // Handle all game events
        while (this.receiver.hasNextEvent()) {
            this.handleEvent(this.receiver.getNextEvent());
        }      
    }

    /**
     * Handle game events. 
     * @param event the game event
     */
    protected handleEvent(event: GameEvent): void {
        switch (event.type) {
            case GameEvents.PLAYER_ENTERED_LEVEL_END: {
                this.handleEnteredLevelEnd();
                break;
            }
            // When the level starts, reenable user input
            case GameEvents.LEVEL_START: {
                Input.enableInput();
                break;
            }
            // When the level ends, change the scene to the next level
            case GameEvents.LEVEL_END: {
                this.emitter.fireEvent(GameEventType.STOP_SOUND, {key: this.levelMusicKey, loop: true, holdReference: true});
                this.sceneManager.changeToScene(this.nextLevel, {}, this.sceneOptions.physics);
                break;
            }
            case GameEvents.HEALTH_CHANGE: {
                this.handleHealthChange(event.data.get("curhp"), event.data.get("maxhp"));
                break;
            }
            case GameEvents.PLAYER_DEAD: {
                this.sceneManager.changeToScene(MainMenu);
                break;
            }
            // Default: Throw an error! No unhandled events allowed.
            default: {
                throw new Error(`Unhandled event caught in scene with type ${event.type}`)
            }
        }
    }

    /* Handlers for the different events the scene is subscribed to */

    protected handleEnteredLevelEnd(): void {
        // If the timer hasn't run yet, start the end level animation
        if (!this.levelEndTimer.hasRun() && this.levelEndTimer.isStopped()) {
            this.levelEndTimer.start();
        }
    }

    protected handleHealthChange(currentHealth: number, maxHealth: number): void {
		let unit = this.healthBar.size.x / maxHealth;
        this.healthBarHealth.size = new Vec2(currentHealth * unit, this.healthBarHealth.size.y);
        this.healthBarHealth.position = new Vec2(this.healthBar.position.x - this.healthBar.size.x / 2 + this.healthBarHealth.size.x / 2, this.healthBarHealth.position.y);
	
        this.healthBarMissing.size = new Vec2((maxHealth - currentHealth) * unit, this.healthBarMissing.size.y);
        this.healthBarMissing.position = new Vec2(this.healthBarHealth.position.x + this.healthBarHealth.size.x / 2 + this.healthBarMissing.size.x / 2, this.healthBarMissing.position.y);
    
    }

    protected initLayers(): void {
        // potentially add some parallax for y
        this.addParallaxLayer(LevelLayers.BACKGROUND, new Vec2(0.25, 0), -1);
        // Add a layer for UI
        this.addUILayer(LevelLayers.UI);
        // Add a layer for players and enemies
        this.addLayer(LevelLayers.PRIMARY);
        // Add a layer for the background
    }

    protected initializeBackground(): void {
        let background = this.add.sprite(this.backgroundKey, "BACKGROUND");
        background.position = this.backgroundImagePosition;
        background.scale = new Vec2(1, 1);
    }

    protected initializeTilemap(): void {
        if (this.tilemapKey === undefined || this.tilemapScale === undefined) {
            throw new Error("Cannot add the tilemap unless the tilemap key and scale are set.");
        }
        // Add the tilemap to the scene
        this.add.tilemap(this.tilemapKey, this.tilemapScale);

        if (this.wallsLayerKey === undefined) {
            throw new Error("Make sure the keys for the wall layer are both set");
        }

        // Get the wall layers 
        this.walls = this.getTilemap(this.wallsLayerKey) as OrthogonalTilemap;

        // Add physicss to the wall layer
        this.walls.addPhysics();

        this.walls.setGroup(GamePhysicsGroups.GROUND);
        this.walls.setTrigger(GamePhysicsGroups.GRAPPLE, GameEvents.GRAPPLE_COLLISION, null);
        this.walls.setTrigger(GamePhysicsGroups.RIFLE, GameEvents.RIFLE_COLLISION, null);
        this.walls.setTrigger(GamePhysicsGroups.SHOTGUN, GameEvents.SHOTGUN_COLLISION, null);
    }

    protected subscribeToEvents(): void {
        this.receiver.subscribe(GameEvents.PLAYER_ENTERED_LEVEL_END);
        this.receiver.subscribe(GameEvents.LEVEL_START);
        this.receiver.subscribe(GameEvents.LEVEL_END);
        this.receiver.subscribe(GameEvents.HEALTH_CHANGE);
        this.receiver.subscribe(GameEvents.PLAYER_DEAD);
    }
    /**
     * Adds in any necessary UI to the game
     */
    protected initializeUI(): void {

        // Health Bar Background
        this.healthBar = <Label>this.add.uiElement(UIElementType.LABEL, LevelLayers.UI, {position: new Vec2(200, 48), text: ""});
        this.healthBar.size = new Vec2(300, 20);
        this.healthBar.backgroundColor = Color.BLUE;
        this.healthBar.borderColor = Color.BLACK;
        this.healthBar.borderRadius = 0;

        // HealthBarHealth
		this.healthBarHealth = <Label>this.add.uiElement(UIElementType.LABEL, LevelLayers.UI, {position: new Vec2(200, 48), text: ""});
		this.healthBarHealth.size = new Vec2(300, 20);
        this.healthBarHealth.backgroundColor = Color.BLUE;
        this.healthBarHealth.borderRadius = 0;

        // HealthBarMissing
		this.healthBarMissing = <Label>this.add.uiElement(UIElementType.LABEL, LevelLayers.UI, {position: new Vec2(200, 48), text: ""});
		this.healthBarMissing.size = new Vec2(300, 20);
		this.healthBarMissing.backgroundColor = Color.RED;
        this.healthBarMissing.borderRadius = 0;

        this.levelTransitionScreen = <Rect>this.add.graphic(GraphicType.RECT, LevelLayers.UI, { position: new Vec2(480, 360), size: new Vec2(960, 720) });
        this.levelTransitionScreen.color = new Color(34, 32, 52);
        this.levelTransitionScreen.alpha = 1;

        this.levelTransitionScreen.tweens.add("fadeIn", {
            startDelay: 0,
            duration: 1000,
            effects: [
                {
                    property: TweenableProperties.alpha,
                    start: 0,
                    end: 1,
                    ease: EaseFunctionType.IN_OUT_QUAD
                }
            ],
            onEnd: GameEvents.LEVEL_END
        });

        /*
             Adds a tween to fade in the start of the level. After the tween has
             finished playing, a level start event gets sent to the EventQueue.
        */
        this.levelTransitionScreen.tweens.add("fadeOut", {
            startDelay: 0,
            duration: 1000,
            effects: [
                {
                    property: TweenableProperties.alpha,
                    start: 1,
                    end: 0,
                    ease: EaseFunctionType.IN_OUT_QUAD
                }
            ],
            onEnd: GameEvents.LEVEL_START
        });
    }

    protected initializeWeaponSystem(): void {
        //this.kernel = this.add.sprite(this.kernelSpriteKey, LevelLayers.PRIMARY);
        this.rifleParticlesSystem = new Rifle(1, Vec2.ZERO, 500, 10, 0, 1); // for 1 particle
        this.rifleParticlesSystem.initializePool(this, LevelLayers.PRIMARY);

        this.shotgunParticlesSystem = new Shotgun(5, Vec2.ZERO, 500, 10, 0, 5); // for 1 particle
        this.shotgunParticlesSystem.initializePool(this, LevelLayers.PRIMARY);

        this.grappleParticlesSystem = new Grapple(100, Vec2.ZERO, 500, 10, 0, 1); // for 1 particle
        this.grappleParticlesSystem.initializePool(this, LevelLayers.PRIMARY);
    }
    /**
     * Initializes the player, setting the player's initial position to the given position.
     * @param position the player's spawn position
     */
    protected initializePlayer(key: string): void {
        if (this.rifleParticlesSystem === undefined) {
            throw new Error("Player rifle system must be initialized before initializing the player!");
        }
        if (this.shotgunParticlesSystem === undefined) {
            throw new Error("Player shotgun system must be initialized before initializing the player!");
        }
        if (this.grappleParticlesSystem === undefined) {
            throw new Error("Player grapple system must be initialized before initializing the player!");
        }
        if (this.playerSpawn === undefined) {
            throw new Error("Player spawn must be set before initializing the player!");
        }



        // Add the player to the scene
        this.player = this.add.animatedSprite(key, LevelLayers.PRIMARY);

        this.player.scale.set(2, 3);
        this.player.position.copy(this.playerSpawn);
        
        // Give the player physics
        //this.player.addPhysics(new AABB(this.player.position.clone(), this.player.boundary.getHalfSize().clone()));
        this.player.addPhysics(new AABB(this.player.position.clone(), new Vec2 (this.player.boundary.getHalfSize().clone().x * 0.75, this.player.boundary.getHalfSize().clone().y)));

        // Add player to player physics group
        this.player.setGroup(GamePhysicsGroups.PLAYER);

        this.player.tweens.add(PlayerTweens.DEATH, {
            startDelay: 0,
            duration: 500,
            effects: [
                {
                    property: "rotation",
                    start: 0,
                    end: Math.PI,
                    ease: EaseFunctionType.IN_OUT_QUAD
                },
                {
                    property: "alpha",
                    start: 1,
                    end: 0,
                    ease: EaseFunctionType.IN_OUT_QUAD
                }
            ],
            onEnd: GameEvents.PLAYER_DEAD
        });


        // Give the player it's AI
        this.player.addAI(PlayerController, { 
            rifleSystem: this.rifleParticlesSystem,
            shotgunSystem: this.shotgunParticlesSystem,
            grappleSystem: this.grappleParticlesSystem,
            tilemap: "Main",
        });
        
    }

    protected initializeViewport(): void {
        if (this.player === undefined) {
            throw new Error("Player must be initialized before setting the viewport to folow the player");
        }
        this.viewport.follow(this.player);
        this.viewport.setZoomLevel(1);
        this.viewport.setBounds(0, 0, this.viewportBounds.x, this.viewportBounds.y);
    }

    protected initializeLevelEnds(): void {
        if (!this.layers.has(LevelLayers.PRIMARY)) {
            throw new Error("Can't initialize the level ends until the primary layer has been added to the scene!");
        }
        this.levelEndArea = <Rect>this.add.graphic(GraphicType.RECT, LevelLayers.PRIMARY, { position: this.levelEndPosition, size: this.levelEndHalfSize });
        this.levelEndArea.addPhysics(undefined, undefined, false, true);
        this.levelEndArea.setGroup(GamePhysicsGroups.GROUND)
        this.levelEndArea.setTrigger(GamePhysicsGroups.PLAYER, GameEvents.PLAYER_ENTERED_LEVEL_END, null);
        this.levelEndArea.color = Color.MAGENTA;
        
    }

    protected initializeNPCs(): void {
        for (let i = 0; i < this.ratPositions.length; i++) {
            let rat = this.add.animatedSprite(this.ratSpriteKey, LevelLayers.PRIMARY);

            rat.position.set(this.ratPositions[i].x, this.ratPositions[i].y);

            // change based on new sprite
            rat.scale.set(0.3, 0.3);
            rat.addPhysics(new AABB(rat.position.clone(), new Vec2(rat.boundary.getHalfSize().x, rat.boundary.getHalfSize().y)));
            // set new group to deal with collisions bw player/player particles and rats
            //rat.setGroup(GamePhysicsGroups.PLAYER)
            rat.addAI(RatAI, { tilemap: "Main" });
            rat.setGroup(GamePhysicsGroups.ENTITY);
            rat.setTrigger(GamePhysicsGroups.RIFLE, GameEvents.RIFLE_HIT, null);
            rat.setTrigger(GamePhysicsGroups.SHOTGUN, GameEvents.SHOTGUN_HIT, null);
            rat.setTrigger(GamePhysicsGroups.GRAPPLE, GameEvents.GRAPPLE_HIT, null);
        }
    }


    // Get the key of the player's jump audio file
    public getJumpAudioKey(): string {
        return this.jumpAudioKey
    }

    // Get the key of the player's death audio file
    public getDyingAudioKey(): string {
        return this.dyingAudioKey
    }

    public getRifleParticlePool() {
        return this.rifleParticlesSystem.getPool();
    }

    public getShotgunParticlePool() {
        return this.shotgunParticlesSystem.getPool();
    }

    public getGrappleParticlePool() {
        return this.grappleParticlesSystem.getPool();
    }
}