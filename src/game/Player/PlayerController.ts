import StateMachineAI from "../../Wolfie2D/AI/StateMachineAI";
import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import OrthogonalTilemap from "../../Wolfie2D/Nodes/Tilemaps/OrthogonalTilemap";

import Fall from "./PlayerStates/Fall";
import Idle from "./PlayerStates/Idle";
import Jump from "./PlayerStates/Jump";
import Walk from "./PlayerStates/Walk";

import Rifle from "./Rifle";
import Input from "../../Wolfie2D/Input/Input";

import { GameControls } from "../GameControls";
import HW3AnimatedSprite from "../Nodes/HW3AnimatedSprite";
import MathUtils from "../../Wolfie2D/Utils/MathUtils";
import { GameEvents } from "../GameEvents";
import { GameEventType } from "../../Wolfie2D/Events/GameEventType"
import Dead from "./PlayerStates/Dead";
import Shotgun from "./Shotgun";
import Grapple from "./Grapple";
import Queue from "../../Wolfie2D/DataTypes/Queue";
import GameEvent from "../../Wolfie2D/Events/GameEvent";
import Timer from "../../Wolfie2D/Timing/Timer";
import Color from "../../Wolfie2D/Utils/Color";
import AABB from "../../Wolfie2D/DataTypes/Shapes/AABB";

// TODO play your heros animations

/**
 * Animation keys for the player spritesheet
 */
export const PlayerAnimations = {
    IDLE: "IDLE",
    JUMP: "JUMP",
    TAKING_DAMAGE: "TAKING_DAMAGE",
    RUN_LEFT: "RUN_LEFT",
    RUN_RIGHT: "RUN_RIGHT",
    ATTACKING_LEFT: "ATTACKING_LEFT",
    ATTACKING_RIGHT: "ATTACKING_RIGHT",
    DYING: "DYING",
    DEATH: "DEATH",
    GRAPPLING: "GRAPPLING",
    SHOTGUN_LEFT: "SHOTGUN_LEFT",
    SHOTGUN_RIGHT: "SHOTGUN_RIGHT",
} as const


/**
 * Tween animations the player can player.
 */
export const PlayerTweens = {
    FLIP: "FLIP",
    DEATH: "DEATH"
} as const

/**
 * Keys for the states the PlayerController can be in.
 */
export const PlayerStates = {
    IDLE: "IDLE",
    WALK: "WALK",
	JUMP: "JUMP",
    FALL: "FALL",
    DEAD: "DEAD",
} as const

/**
 * The controller that controls the player.
 */
export default class PlayerController extends StateMachineAI {
    public readonly MAX_SPEED: number = 400;
    public readonly MIN_SPEED: number = 275;

    /** Health and max health for the player */
    protected _health: number;
    protected _maxHealth: number;

    /** The players game node */
    protected owner: HW3AnimatedSprite;

    protected _velocity: Vec2;
	protected _speed: number;

    protected tilemap: OrthogonalTilemap;

    protected rifle: Rifle;
    protected shotgun: Shotgun;
    protected grapple: Grapple;
    protected grappleCoords: Queue<Vec2>;

    protected isDead: boolean;
    protected readCoords: boolean;
    protected inGrapple: boolean;

    protected invincibleTimer: Timer;

    protected storedVelx: number;
    
    public initializeAI(owner: HW3AnimatedSprite, options: Record<string, any>){
        this.owner = owner;

        this.rifle = options.rifleSystem;
        this.shotgun = options.shotgunSystem;
        this.grapple = options.grappleSystem;

        this.tilemap = this.owner.getScene().getTilemap(options.tilemap) as OrthogonalTilemap;
        this.speed = 400;
        this.velocity = Vec2.ZERO;

        this.health = 50;
        this.maxHealth = 50;

        this.isDead = false;
        this.inGrapple = false;

        this.grappleCoords = new Queue<Vec2>();

        this.readCoords = true;

        this.invincibleTimer = new Timer(1000);


        // Add the different states the player can be in to the PlayerController 
		this.addState(PlayerStates.IDLE, new Idle(this, this.owner));
		this.addState(PlayerStates.WALK, new Walk(this, this.owner));
        this.addState(PlayerStates.JUMP, new Jump(this, this.owner));
        this.addState(PlayerStates.FALL, new Fall(this, this.owner));
        this.addState(PlayerStates.DEAD, new Dead(this, this.owner));
        // need to initalize player in grapple state
        
        // Start the player in the Idle state
        this.initialize(PlayerStates.IDLE);

        this.receiver.subscribe(GameEvents.GRAPPLE_COLLISION);
        this.receiver.subscribe(GameEvents.RIFLE_COLLISION);
        this.receiver.subscribe(GameEvents.SHOTGUN_COLLISION);
        this.receiver.subscribe(GameEvents.GRAPPLE_HIT);
        this.receiver.subscribe(GameEvents.PLAYER_HIT);
    }

    /** 
	 * Get the inputs from the keyboard, or Vec2.Zero if nothing is being pressed
	 */
    public get inputDir(): Vec2 {
        let direction = Vec2.ZERO;
		direction.x = (Input.isPressed(GameControls.MOVE_LEFT) ? -1 : 0) + (Input.isPressed(GameControls.MOVE_RIGHT) ? 1 : 0);
		direction.y = (Input.isJustPressed(GameControls.JUMP) ? -1 : 0);
		return direction;
    }
    /** 
     * Gets the direction of the mouse from the player's position as a Vec2
     */
    public get faceDir(): Vec2 { return this.owner.position.dirTo(Input.getGlobalMousePosition()); }

    public update(deltaT: number): void {
		super.update(deltaT);

        if (this.owner.animation.isPlaying(PlayerAnimations.TAKING_DAMAGE)) {
            Input.disableInput();
        } else {
            Input.enableInput();
        }

        if (this.grappleCoords.hasItems()) {
            let moveTo = this.grappleCoords.dequeue();
            Input.disableInput();
            this.owner.position = (new Vec2(moveTo.x, moveTo.y));
            if (!this.grappleCoords.hasItems()) {
                this.readCoords = true;
                this.inGrapple = false;
                Input.enableInput();
            }
        }

        // If the player hits the attack button and the weapon system isn't running, restart the system and fire!
        if ((Input.isMouseJustPressed(0) && !this.rifle.isSystemRunning()) && !this.inGrapple && !Input.isMouseJustPressed(1) && !Input.isMouseJustPressed(2)&& !Input.isMouseJustPressed(4)) {
            console.log("FIRING RIFLE")
            // Start the particle system at the player's current position
            this.rifle.startSystem(500, 0, this.owner.position, this.faceDir);
            //this.weapon.startSystem(100, 0, this.owner.position, this.faceDir); // fast fire but no travel
            // get direction and play attacking animation
            let direction = this.faceDir;
            if (direction.x < 0) {
                this.owner.animation.play(PlayerAnimations.ATTACKING_LEFT);
                // return to idle
                this.owner.animation.queue(PlayerAnimations.IDLE, true);
            }
            else {
                this.owner.animation.play(PlayerAnimations.ATTACKING_RIGHT);
                this.owner.animation.queue(PlayerAnimations.IDLE, true);
            }

            // plays rifle sound
            let gunAudio = this.owner.getScene().getPlayerRifleAudioKey();
            this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: gunAudio, loop: false, holdReference: false});
        }

        if ((Input.isMouseJustPressed(2) && !this.shotgun.isSystemRunning()) && !this.inGrapple) {
            console.log("FIRING SHOTGUN")
            this.shotgun.startSystem(500, 0, this.owner.position, this.faceDir);
            let direction = this.faceDir;
            if (direction.x > 0) {
                this.owner.animation.play(PlayerAnimations.SHOTGUN_LEFT);
                // return to idle
                this.owner.animation.queue(PlayerAnimations.IDLE, true);
            }
            else {
                this.owner.animation.play(PlayerAnimations.SHOTGUN_RIGHT);
                this.owner.animation.queue(PlayerAnimations.IDLE, true);
            }

            // plays shotgun sound
            let gunAudio = this.owner.getScene().getPlayerShotgunAudioKey();
            this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: gunAudio, loop: false, holdReference: false});
        }

        if (Input.isJustPressed(GameControls.GRAPPLE) || Input.isMouseJustPressed(4) && !this.inGrapple) {
            console.log("FIRING GRAPPLE")
            // send a vector outwards. check if it collides a tile or entity. if it does, move the player to that position. if nothing is hit, do nothing
            //this.grapple.startSystem(500, 0, new Vec2(this.owner.position.x, this.owner.position.y - this.owner.collisionShape.halfSize.y), this.faceDir);
            this.grapple.startSystem(500, 0, this.owner.position, this.faceDir);
            this.owner.animation.play(PlayerAnimations.GRAPPLING);
            this.owner.animation.queue(PlayerAnimations.IDLE, true);

            // plays grapple sound
            let gunAudio = this.owner.getScene().getPlayerGrappleAudioKey();
            this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: gunAudio, loop: false, holdReference: false});
        }

        // if the player is dead, enter the dead state
        if (this.health <= 0 && !this.isDead) {
            this.isDead = true;
            this.changeState(PlayerStates.DEAD);
        }

	}

    handleEvent(event: GameEvent): void {
        switch (event.type) {
            case GameEvents.GRAPPLE_COLLISION:
                this.handleGrappleCollision(event.data.get("node"));
                break;
            case GameEvents.RIFLE_COLLISION:
                this.handleRifleCollision(event.data.get("node"));
                break;
            case GameEvents.SHOTGUN_COLLISION:
                this.handleShotgunCollision(event.data.get("node"));
                break;
            case GameEvents.GRAPPLE_HIT:
                this.handleGrappleCollision(event.data.get("node"));
                break;
            case GameEvents.PLAYER_HIT:
                this.handlePlayerHit();
                break;
        }
    }

    protected handlePlayerHit() {
        if (this.invincibleTimer.isStopped()) {
            this.health -= 5;
            this.owner.animation.stop();
            this.owner.animation.playIfNotAlready(PlayerAnimations.TAKING_DAMAGE, false);
            this.owner.animation.queue(PlayerAnimations.IDLE, true);
            this.invincibleTimer.start();
            
            // plays damage sound
            let damageAudio = this.owner.getScene().getPlayerDamageAudioKey()
            this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: damageAudio, loop: false, holdReference: false});
        }
    }

    protected handleRifleCollision(particleId: number) {
        let particles = this.rifle.getPool();
        let particle = particles.find(particle => particle.id === particleId);
        if (particle !== undefined) {
            particle.position = Vec2.ZERO;
            particle.color = Color.TRANSPARENT;
            //particle.collisionShape = new AABB(Vec2.ZERO, Vec2.ZERO); // did nothing
            particle.vel = Vec2.ZERO;;
        }
    }

    protected handleShotgunCollision(particleId: number) {
        let particles = this.shotgun.getPool();
        let particle = particles.find(particle => particle.id === particleId);
        if (particle !== undefined) {
            particle.position = Vec2.ZERO;
            particle.color = Color.TRANSPARENT;
            //particle.collisionShape = new AABB(Vec2.ZERO, Vec2.ZERO);
            particle.vel = Vec2.ZERO;;
        }
    }

    protected handleGrappleCollision(particleId: number) {
        this.invincibleTimer.start();
        let particles = this.grapple.getPool();
        let particle = particles.find(particle => particle.id === particleId);
        if (particle !== undefined) {
            this.grapple.stopSystem();
            let position = particle.position;
            particle.position = new Vec2(0,0);
            // based on this.player.position and position, calculate vector
            let fromPosition = this.owner.position;
            let toPosition = position;
            // get the closest tile to the position
            let reachTile = this.tilemap.getColRowAt(toPosition);
            // DO NOT CHANGE
            reachTile.x = reachTile.x * 48;
            reachTile.y = reachTile.y * 48;

            //console.log(reachTile.y)
            //console.log(fromPosition.y)
            //console.log(this.tilemap.getColRowAt(new Vec2(reachTile.x, reachTile.y - 48)))

            // create 10 coords between the two positions, enqueue them to grappleCoords
            let numCoords = 15;
            let xDiff = reachTile.x - fromPosition.x + 24;
            let yDiff = reachTile.y - fromPosition.y + 24;
            if ((fromPosition.y - reachTile.y) <= 100 && (fromPosition.y > reachTile.y)) {
                yDiff = reachTile.y - fromPosition.y + 48; // * (1 - ((fromPosition.y - reachTile.y)/48))
                //console.log("c1")
            }
            else if (reachTile.y >= fromPosition.y) {
                yDiff = reachTile.y - fromPosition.y;
                //console.log("c2")
            }

            let xStep = xDiff / numCoords;
            let yStep = yDiff / numCoords;

            let newCoord = Vec2.ZERO
            if (this.readCoords) {
                this.readCoords = false;
                for (let i = 1; i < numCoords; i++) {
                    newCoord = new Vec2(fromPosition.x + (xStep * i),fromPosition.y + (yStep * i));
                    this.grappleCoords.enqueue(newCoord);
                }
            }
            this.inGrapple = true;
        }
    }

    public get velocity(): Vec2 { return this._velocity; }
    public set velocity(velocity: Vec2) { this._velocity = velocity; }

    public get speed(): number { return this._speed; }
    public set speed(speed: number) { this._speed = speed; }

    public get maxHealth(): number { return this._maxHealth; }
    public set maxHealth(maxHealth: number) { 
        this._maxHealth = maxHealth; 
        // When the health changes, fire an event up to the scene.
        this.emitter.fireEvent(GameEvents.HEALTH_CHANGE, {curhp: this.health, maxhp: this.maxHealth});
    }

    public get health(): number { return this._health; }
    public set health(health: number) { 
        this._health = MathUtils.clamp(health, 0, this.maxHealth);
        // When the health changes, fire an event up to the scene.
        this.emitter.fireEvent(GameEvents.HEALTH_CHANGE, {curhp: this.health, maxhp: this.maxHealth});
        // If the health hit 0, change the state of the player
        if (this.health === 0) { this.changeState(PlayerStates.DEAD); }
    }

}