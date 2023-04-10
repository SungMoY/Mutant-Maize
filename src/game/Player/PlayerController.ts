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
import Dead from "./PlayerStates/Dead";

// TODO play your heros animations

/**
 * Animation keys for the player spritesheet
 */
export const PlayerAnimations = {
    IDLE: "IDLE",
    WALK: "WALK",
    JUMP: "JUMP",
    TAKING_DAMAGE: "TAKING_DAMAGE",
    RUN_LEFT: "RUN_LEFT",
    RUN_RIGHT: "RUN_RIGHT",
    ATTACKING_LEFT: "ATTACKING_LEFT",
    ATTACKING_RIGHT: "ATTACKING_RIGHT",
    DYING: "DYING",
    DEATH: "DEATH"
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
    // protected cannon: Sprite;
    protected rifle: Rifle;

    protected isDead: boolean;

    
    public initializeAI(owner: HW3AnimatedSprite, options: Record<string, any>){
        this.owner = owner;

        this.rifle = options.weaponSystem;

        this.tilemap = this.owner.getScene().getTilemap(options.tilemap) as OrthogonalTilemap;
        this.speed = 400;
        this.velocity = Vec2.ZERO;

        this.health = 5;
        this.maxHealth = 5;

        this.isDead = false;

        // Add the different states the player can be in to the PlayerController 
		this.addState(PlayerStates.IDLE, new Idle(this, this.owner));
		this.addState(PlayerStates.WALK, new Walk(this, this.owner));
        this.addState(PlayerStates.JUMP, new Jump(this, this.owner));
        this.addState(PlayerStates.FALL, new Fall(this, this.owner));
        this.addState(PlayerStates.DEAD, new Dead(this, this.owner));
        // need to initalize player in grapple state
        
        // Start the player in the Idle state
        this.initialize(PlayerStates.IDLE);
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

        // If the player hits the attack button and the weapon system isn't running, restart the system and fire!
        if ((Input.isMousePressed(0) && !this.rifle.isSystemRunning())) {
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
        }

        if ((Input.isMousePressed(2) && !this.rifle.isSystemRunning())) {
            this.rifle.startSystem(500, 0, this.owner.position, this.faceDir);
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
        }

        // if the player is dead, enter the dead state
        if (this.health <= 0 && !this.isDead) {
            this.isDead = true;
            this.changeState(PlayerStates.DEAD);
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