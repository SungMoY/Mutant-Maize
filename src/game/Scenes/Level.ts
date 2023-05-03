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
import Button from "../../Wolfie2D/Nodes/UIElements/Button";
import Sprite from "../../Wolfie2D/Nodes/Sprites/Sprite";
import Grapple from "../Player/Grapple";
import Queue from "../../Wolfie2D/DataTypes/Queue";
import RatAI from "../NPC/Rat/RatAI";
import { GameControls } from "../GameControls";
import Level1 from "./Level1";
import BirdAI from "../NPC/Bird/BirdAI";
import ChickenAI from "../NPC/Chicken/ChickenAI";
import Egg from "../NPC/Chicken/Egg";
import Bite from "../NPC/Dog/Bite";


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
    protected hazardsLayerKey: string;
    /** The scale for the tilemap */
    protected tilemapScale: Vec2;
    /** The wall layer of the tilemap */
    protected walls: OrthogonalTilemap;
    protected hazards: OrthogonalTilemap;

    // background image
    protected backgroundKey: string;

    /** Sound and music */
    protected levelMusicKey: string;
    protected jumpAudioKey: string; //
    protected dyingAudioKey: string; //

    protected playerDamageAudioKey: string;
    protected playerDeathAudioKey: string;
    protected playerGrappleAudioKey: string;
    protected playerJumpAudioKey: string;
    protected playerRifleAudioKey: string;
    protected playerShotgunAudioKey: string;
    protected playerWalkAudioKey: string;

    protected bossChargeAudioKey: string;
    protected bossMusicKey: string;

    protected chickenDyingAudioKey: string;
    protected chickenEggAudioKey: string;
    protected chickenWalkAudioKey: string;

    protected dogBiteAudioKey: string;
    protected dogDyingAudioKey: string;
    protected dogWalkAudioKey: string;

    protected HitAudioKey: string;
    protected mobDyingAudioKey: string;

    // sets viewport dynamically for each level
    // map length in tiles * tile dimension in pixels * tilemap scale
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

    protected chickenSpriteKey: string;
    protected chickenPosition: Vec2;
    protected eggParticlesSystem: Egg;

    protected dogSpiteKey: string;
    protected dogPosition: Vec2;
    protected biteParticlesSystem: Bite;

    protected bossViewport: Array<number>;

    protected parallaxBackground: boolean;

    public constructor(viewport: Viewport, sceneManager: SceneManager, renderingManager: RenderingManager, options: Record<string, any>) {
        super(viewport, sceneManager, renderingManager, {...options, physics: {
            groupNames: [
                GamePhysicsGroups.GROUND,
                GamePhysicsGroups.HAZARD,
                GamePhysicsGroups.PLAYER,
                GamePhysicsGroups.RIFLE,
                GamePhysicsGroups.SHOTGUN,
                GamePhysicsGroups.GRAPPLE,
                GamePhysicsGroups.ENTITY,
            ],
            collisions: [
                [0, 1, 1, 1, 1, 1, 1],
                [1, 0, 1, 1, 1, 1, 1],
                [1, 1, 0, 0, 0, 0, 1],
                [1, 1, 0, 0, 0, 0, 1],
                [1, 1, 0, 0, 0, 0, 1],
                [1, 1, 0, 0, 0, 0, 1],
                [1, 1, 1, 1, 1, 1, 0]
            ]
         }});
        this.add = new HW3FactoryManager(this, this.tilemaps);

    }

    public startScene(): void {
        this.initLayers();
        this.initializeBackground();
        this.initializeTilemap();
        this.initializeWeaponSystem();
        this.initializeUI();
        this.initializePlayer(this.playerSpriteKey);
        this.initializeViewport();
        this.initializeNPCs();
        this.subscribeToEvents();
        this.initializeLevelEnds();

        this.levelTransitionTimer = new Timer(500, null, false);
        this.levelTransitionTimer.start();
        this.levelEndTimer = new Timer(500, () => {
            // After the level end timer ends, fade to black and then go to the next scene
            this.levelTransitionScreen.tweens.play("fadeIn");
        });

        // Initially disable player movement
        Input.disableInput();

        // Start the black screen fade out
        this.levelTransitionScreen.tweens.play("fadeOut");
        
        // Start playing the level music
        this.emitter.fireEvent(GameEventType.PLAY_MUSIC, {key: this.levelMusicKey, loop: true, holdReference: true});

    }

    /* Update method for the scene */

    public updateScene(deltaT: number) {
        // Handle all game events
        while (this.receiver.hasNextEvent()) {
            this.handleEvent(this.receiver.getNextEvent());
        }

        this.lockPlayer(this.player, this.viewport.getCenter(), this.viewport.getHalfSize());

        if (Input.isPressed(GameControls.CHEAT_ONE)) {
            this.sceneManager.changeToScene(Level1);
        }
        if (Input.isPressed(GameControls.CHEAT_TWO)) {
            this.player.position.copy(new Vec2(9912, 624));
        }
        if (Input.isPressed(GameControls.CHEAT_THREE)) {
            console.log(this.viewport.getOrigin().x);
        }
        if (Input.isPressed(GameControls.CHEAT_FOUR)) {
            this.player.position.copy(this.playerSpawn);
        }

        if (this.bossViewport && this.viewport.getOrigin().x >= this.bossViewport[0]) {
            console.log("CHANGING TO BOSS SCENE")
            this.emitter.fireEvent(GameEvents.START_BOSS_FIGHT, {});
        }
        if (!this.levelTransitionTimer.hasRun()) {
            this.player.position.copy(this.playerSpawn);
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
                this.emitter.fireEvent(GameEventType.STOP_SOUND, {key: this.levelMusicKey});
                this.emitter.fireEvent(GameEventType.STOP_SOUND, {key: this.bossMusicKey})
                this.sceneManager.changeToScene(this.nextLevel, {}, this.sceneOptions.physics);
                break;
            }
            case GameEvents.HEALTH_CHANGE: {
                this.handleHealthChange(event.data.get("curhp"), event.data.get("maxhp"));
                break;
            }
            case GameEvents.PLAYER_DEAD: {
                this.emitter.fireEvent(GameEventType.STOP_SOUND, {key: this.levelMusicKey});
                this.emitter.fireEvent(GameEventType.STOP_SOUND, {key: this.bossMusicKey})
                this.sceneManager.changeToScene(MainMenu);
                break;
            }
            case GameEvents.START_BOSS_FIGHT: {
                this.handleStartBossFight();
                break;
            }
            case GameEvents.BOSS_DEAD: {
                this.handleBossDead();
                break;
            }
            // Default: Throw an error! No unhandled events allowed.
            default: {
                throw new Error(`Unhandled event caught in scene with type ${event.type}`)
            }
        }
    }

    /* Handlers for the different events the scene is subscribed to */

    protected handleStartBossFight(): void {
        // lock the viewport
        // stop level music
        // play boss music
        // this will change bc rn, we are temp spawning boss at end of level 1
        this.emitter.fireEvent(GameEventType.STOP_SOUND, {key: this.levelMusicKey});
        this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: this.bossMusicKey, loop: true, holdReference: true});

        this.viewport.setFocus(new Vec2(this.bossViewport[1], this.bossViewport[2]));
        this.viewport.follow(null);
        this.bossViewport = null;
    }

    protected handleBossDead(): void {
        // unlock the viewport
        // stop boss music
        // play level music
        // this will change bc rn, we are temp spawning boss at end of level 1
        this.emitter.fireEvent(GameEventType.STOP_SOUND, {key: this.bossMusicKey});
        this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: this.levelMusicKey, loop: true, holdReference: true});

        this.viewport.follow(this.player);


    }

    protected handleEnteredLevelEnd(): void {
        // If the timer hasn't run yet, start the end level animation
        if (!this.levelEndTimer.hasRun() && this.levelEndTimer.isStopped()) {
            Input.disableInput();
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

    protected lockPlayer(player: AnimatedSprite, viewportCenter: Vec2, viewportHalfSize: Vec2): void {
		if (player.position.x - player.boundary.getHalfSize().x < viewportCenter.x - viewportHalfSize.x) {
			player.position.x = viewportCenter.x - viewportHalfSize.x + player.boundary.getHalfSize().x ;
		}
		if (player.position.x + player.boundary.getHalfSize().x > viewportCenter.x + viewportHalfSize.x) {
			player.position.x = viewportCenter.x + viewportHalfSize.x - player.boundary.getHalfSize().x;
		}
	}

    protected initLayers(): void {
        // Add a layer for the background
        // potentially add some parallax for y
        if (this.parallaxBackground) {
            this.addParallaxLayer(LevelLayers.BACKGROUND, new Vec2(0.25, 0), -1);
        } else {
            this.addLayer(LevelLayers.BACKGROUND);
        }
        // Add a layer for UI
        this.addUILayer(LevelLayers.UI);
        // Add a layer for players and enemies
        this.addLayer(LevelLayers.PRIMARY);
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

        // Get hazards layer
        this.hazards = this.getTilemap(this.hazardsLayerKey) as OrthogonalTilemap;
        this.hazards.addPhysics();
        this.hazards.setTrigger(GamePhysicsGroups.GRAPPLE, GameEvents.GRAPPLE_COLLISION, null);
        this.hazards.setTrigger(GamePhysicsGroups.RIFLE, GameEvents.RIFLE_COLLISION, null);
        this.hazards.setTrigger(GamePhysicsGroups.SHOTGUN, GameEvents.SHOTGUN_COLLISION, null);
        this.hazards.setTrigger(GamePhysicsGroups.PLAYER, GameEvents.PLAYER_HIT, null);

    }

    protected subscribeToEvents(): void {
        this.receiver.subscribe(GameEvents.PLAYER_ENTERED_LEVEL_END);
        this.receiver.subscribe(GameEvents.LEVEL_START);
        this.receiver.subscribe(GameEvents.LEVEL_END);
        this.receiver.subscribe(GameEvents.HEALTH_CHANGE);
        this.receiver.subscribe(GameEvents.PLAYER_DEAD);
        this.receiver.subscribe(GameEvents.START_BOSS_FIGHT);
        this.receiver.subscribe(GameEvents.BOSS_DEAD);
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

        this.shotgunParticlesSystem = new Shotgun(10, Vec2.ZERO, 500, 10, 0, 10); // for 10 particle
        this.shotgunParticlesSystem.initializePool(this, LevelLayers.PRIMARY);

        this.grappleParticlesSystem = new Grapple(100, Vec2.ZERO, 500, 10, 0, 1); // for 1 particle
        this.grappleParticlesSystem.initializePool(this, LevelLayers.PRIMARY);

        this.eggParticlesSystem = new Egg(1, Vec2.ZERO, 2000, 10, 0, 1); // for 1 particle
        this.eggParticlesSystem.initializePool(this, LevelLayers.PRIMARY);

        this.biteParticlesSystem = new Bite(1, Vec2.ZERO, 2000, 10, 0, 1); // for 1 particle
        this.biteParticlesSystem.initializePool(this, LevelLayers.PRIMARY);
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
        console.log("spawn:", this.playerSpawn.x, this.playerSpawn.y)
        this.player.position.copy(this.playerSpawn);

        
        // Give the player physics
        //this.player.addPhysics(new AABB(this.player.position.clone(), this.player.boundary.getHalfSize().clone()));
        this.player.addPhysics(new AABB(this.player.position.clone(), new Vec2 (this.player.boundary.getHalfSize().clone().x * 0.75, this.player.boundary.getHalfSize().clone().y))
        , undefined, false);

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
        this.levelEndArea.color = new Color(0,0,0,0.1);
        
    }

    protected initializeNPCs(): void {
        for (let i = 0; i < this.ratPositions.length; i++) {
            let rat = this.add.animatedSprite(this.ratSpriteKey, LevelLayers.PRIMARY);
            rat.position.set(this.ratPositions[i].x, this.ratPositions[i].y);
            rat.scale.set(2, 2);       
            let center = new Vec2(rat.position.x, rat.position.y);

            // i hate that these values are hard coded but it seems to work
            let halfSize = new Vec2(rat.boundary.getHalfSize().x, 20);
            rat.addPhysics(new AABB(center, halfSize), undefined, false, false);
            rat.colliderOffset.set(0, 12);

            rat.addAI(RatAI, { tilemap: "Main" });
            rat.setGroup(GamePhysicsGroups.ENTITY);
            rat.setTrigger(GamePhysicsGroups.RIFLE, GameEvents.RIFLE_HIT, null);
            rat.setTrigger(GamePhysicsGroups.SHOTGUN, GameEvents.SHOTGUN_HIT, null);
            rat.setTrigger(GamePhysicsGroups.GRAPPLE, GameEvents.GRAPPLE_HIT, null);
            rat.setTrigger(GamePhysicsGroups.PLAYER, GameEvents.PLAYER_HIT, null);
        }
        for (let i = 0; i < this.birdPositions.length; i++) {
            let bird = this.add.animatedSprite(this.birdSpriteKey, LevelLayers.PRIMARY);
            bird.position.set(this.birdPositions[i].x, this.birdPositions[i].y-24);
            bird.scale.set(2, 2);
            let center = new Vec2(bird.position.x, bird.position.y);

            // i hate that these values are hard coded but it seems to work
            let halfSize = new Vec2(bird.boundary.getHalfSize().x, 24);
            bird.addPhysics(new AABB(center, halfSize), undefined, false, false);

            bird.addAI(BirdAI, { tilemap: "Main" });
            bird.setGroup(GamePhysicsGroups.ENTITY);
            bird.setTrigger(GamePhysicsGroups.RIFLE, GameEvents.RIFLE_HIT, null);
            bird.setTrigger(GamePhysicsGroups.SHOTGUN, GameEvents.SHOTGUN_HIT, null);
            bird.setTrigger(GamePhysicsGroups.GRAPPLE, GameEvents.GRAPPLE_HIT, null);
            bird.setTrigger(GamePhysicsGroups.PLAYER, GameEvents.PLAYER_HIT, null);
        }
        if (this.chickenSpriteKey) {
            console.log("SPAWNING CHICKEN BOSS")
            let chicken = this.add.animatedSprite(this.chickenSpriteKey, LevelLayers.PRIMARY);
            chicken.position.set(this.chickenPosition.x, this.chickenPosition.y);
            chicken.scale.set(6, 6);
            chicken.addPhysics(new AABB(chicken.position.clone(), new Vec2(chicken.boundary.getHalfSize().clone().x*0.75, chicken.boundary.getHalfSize().clone().y))
                 ,undefined, false, false);
            chicken.addAI(ChickenAI, {
                eggSystem: this.eggParticlesSystem
            });
            chicken.setGroup(GamePhysicsGroups.ENTITY);
            chicken.setTrigger(GamePhysicsGroups.RIFLE, GameEvents.RIFLE_HIT, null);
            chicken.setTrigger(GamePhysicsGroups.SHOTGUN, GameEvents.SHOTGUN_HIT, null);
            chicken.setTrigger(GamePhysicsGroups.GRAPPLE, GameEvents.GRAPPLE_HIT, null);
            chicken.setTrigger(GamePhysicsGroups.PLAYER, GameEvents.PLAYER_HIT, null);
        }
        if (this.dogSpiteKey) {
            console.log("SPAWNING DOG BOSS")
            let dog = this.add.animatedSprite(this.dogSpiteKey, LevelLayers.PRIMARY);
            dog.position.set(this.dogPosition.x, this.dogPosition.y);
            dog.scale.set(6, 6);
            dog.addPhysics(undefined, undefined, false, false);
            //dog.addAI(DogAI, { biteSystem: this.biteParticlesSystem })
            dog.setGroup(GamePhysicsGroups.ENTITY);
            dog.setTrigger(GamePhysicsGroups.RIFLE, GameEvents.RIFLE_HIT, null);
            dog.setTrigger(GamePhysicsGroups.SHOTGUN, GameEvents.SHOTGUN_HIT, null);
            dog.setTrigger(GamePhysicsGroups.GRAPPLE, GameEvents.GRAPPLE_HIT, null);
            dog.setTrigger(GamePhysicsGroups.PLAYER, GameEvents.PLAYER_HIT, null);
        }
    }

    // Gets the key of the player hurt audio
    public getPlayerDamageAudioKey(): string {
        return this.playerDamageAudioKey;
    }

    // Gets the key of the player death audio
    public getPlayerDyingAudioKey(): string {
        return this.playerDeathAudioKey;
    }

    // Gets the key of the player grapple
    public getPlayerGrappleAudioKey(): string {
        return this.playerGrappleAudioKey;
    }

    // Gets the key of the player jump
    public getPlayerJumpAudioKey(): string {
        return this.playerJumpAudioKey;
    }

    // Gets the key of the player rifle
    public getPlayerRifleAudioKey(): string {
        return this.playerRifleAudioKey;
    }

    // Gets the key of the player shotgun
    public getPlayerShotgunAudioKey(): string {
        return this.playerShotgunAudioKey;
    }

    // Gets the key of the player walking
    public getPlayerWalkAudioKey(): string {
        return this.playerWalkAudioKey;
    }

    // Gets the key of mob damage
    public getHitAudioKey(): string {
        return this.HitAudioKey;
    }

    // Gets the key of mob damage
    public getMobDeathAudioKey(): string {
        return this.mobDyingAudioKey;
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

    public getChickenDyingAudioKey() {
        return this.chickenDyingAudioKey;
    }

    public getChickenEggAudioKey() {
        return this.chickenEggAudioKey;
    }

    public getChickenWalkingAudioKey() {
        return this.chickenWalkAudioKey;
    }
}