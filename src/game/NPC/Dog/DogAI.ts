import StateMachineAI from "../../../Wolfie2D/AI/StateMachineAI";
import AABB from "../../../Wolfie2D/DataTypes/Shapes/AABB";
import Vec2 from "../../../Wolfie2D/DataTypes/Vec2";
import GameEvent from "../../../Wolfie2D/Events/GameEvent";
import { GameEventType } from "../../../Wolfie2D/Events/GameEventType";
import Viewport from "../../../Wolfie2D/SceneGraph/Viewport";
import Timer from "../../../Wolfie2D/Timing/Timer";
import Color from "../../../Wolfie2D/Utils/Color";
import { GameEvents } from "../../GameEvents";
import HW3AnimatedSprite from "../../Nodes/HW3AnimatedSprite";
import Bite from "./Bite";
import DogBite from "./DogBite";
import DogCharge from "./DogCharge";
import DogIdle from "./DogIdle";

import MathUtils from "../../../Wolfie2D/Utils/MathUtils";

export default class DogAI extends StateMachineAI {

    public readonly MAX_SPEED: number = 500;
    public readonly MIN_SPEED: number = 275;

    protected owner: HW3AnimatedSprite;
    protected _velocity: Vec2;

    protected _health: number;
    protected _maxHealth: number;

    protected _goLeft: boolean
    protected _biteLeft: boolean;
    protected dirTracker: number;

    protected idleTimer: Timer;
    protected chargeTimer: Timer;
    protected biteTimer: Timer;

    protected isDead: boolean;

    protected biteSystem: Bite;

    protected viewport: Array<number>;

    public initializeAI(owner: HW3AnimatedSprite, options: Record<string, any>): void {
        this.owner = owner;
        this._velocity = new Vec2(0, 0)

        this.health = 500;
        this.maxHealth = 500;

        this.goLeft = true;
        this.biteSystem = options.biteSystem;
        this.viewport = options.viewport;
        this.biteLeft = true;
        this.dirTracker = 0;

        this.addState("IDLE", new DogIdle(this, this.owner));
        this.addState("CHARGE", new DogCharge(this, this.owner));
        this.addState("BITE", new DogBite(this, this.owner));
        this.initialize("IDLE");

        // i want to loop the following
        // bite left        0
        // go to middle     1
        // bite right       2
        // bite left        3
        // to to left       4
        // bite right       5
        // go to middle     6
        // bite left        7
        // bite right       8
        // go to right      9
        // repeat           0

        // if (this.goLeft) {
        //     this.velocity.x = -this.MAX_SPEED;
        //     this.goLeft = false;
        // } else {
        //     this.velocity.x = this.MAX_SPEED;
        //     this.goLeft = true;
        // }

        // lord forgive me for what i am about to do
        this.idleTimer = new Timer(1500, () => {
            if (this.dirTracker > 9) {
                this.dirTracker = 0;
            }
            switch (this.dirTracker) {
                case 0: {
                    this.doBite();
                    break;
                } 
                case 1: {
                    this.velocity.x = -this.MAX_SPEED;
                    this.doCharge();
                    break;
                }
                case 2: {
                    this.doBite();
                    break;
                }
                case 3: {
                    this.doBite();
                    break;
                }
                case 4: {
                    this.velocity.x = -this.MAX_SPEED;
                    this.doCharge();
                    break;
                }
                case 5: {
                    this.doBite();
                    break;
                }
                case 6: {
                    this.velocity.x = this.MAX_SPEED;
                    this.doCharge();
                    break;
                }
                case 7: {
                    this.doBite();
                    break;
                }
                case 8: {
                    this.doBite();
                    break;
                }
                case 9: {
                    this.velocity.x = this.MAX_SPEED;
                    this.doCharge();
                    break;
                }
            }
        }, false);

        this.chargeTimer = new Timer(700, () => {
            // finished charge, go to idle
            this.dirTracker++;
            this.velocity.x = 0;
            this.changeState("IDLE");
            this.idleTimer.start();
        }, false);

        this.biteTimer = new Timer(1000, () => {
            // finished bite, go to idle
            this.dirTracker++;
            this.biteLeft = !this.biteLeft;
            this.changeState("IDLE");
            this.idleTimer.start();
        }, false);

        this.receiver.subscribe(GameEvents.RIFLE_HIT);
        this.receiver.subscribe(GameEvents.SHOTGUN_HIT);
        this.receiver.subscribe(GameEvents.GRAPPLE_HIT);
        this.receiver.subscribe(GameEvents.START_BOSS_FIGHT);
    }

    protected doCharge(): void {
        this.changeState("CHARGE");
        this.chargeTimer.start();
    }

    protected doBite(): void {
        this.changeState("BITE");
        // bite here, customize its properties
        // the bite particle goes into the ground but i think its fine
        let position;
        let direction;
        if (this.biteLeft) { 
            position = new Vec2(this.owner.position.x - this.owner.collisionShape.halfSize.x, this.owner.position.y + this.owner.collisionShape.halfSize.y);
            direction = new Vec2(-1, 0); 
        } else { 
            direction = new Vec2(1, 0);
            position = new Vec2(this.owner.position.x + this.owner.collisionShape.halfSize.x, this.owner.position.y + this.owner.collisionShape.halfSize.y);
        }
        this.biteSystem.startSystem(1000, 0, position, direction);
        this.biteTimer.start();
    }

    public update(deltaT: number): void {
        super.update(deltaT);

        if (this._health <= 0 && !this.isDead) {
            this.emitter.fireEvent(GameEvents.BOSS_DEAD);
            // handle all boss dying related stuff here
            this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: this.owner.getScene().getDogDyingAudioKey(), loop: false, holdReference: true})
            this.emitter.fireEvent(GameEventType.STOP_SOUND, {key: this.owner.getScene().getDogBiteAudioKey()});
            this.emitter.fireEvent(GameEventType.STOP_SOUND, {key: this.owner.getScene().getDogWalkingAudioKey()});
            this.isDead = true;
            this.idleTimer.pause();
            this.chargeTimer.pause();
            this.biteTimer.pause();
            this.owner.visible = false;
            this.owner.isCollidable = false;
            this.owner.collisionShape = new AABB(Vec2.ZERO, Vec2.ZERO);
            this.biteSystem.stopSystem();
        }
        this.owner.move(this.velocity.scaled(deltaT));

    }

    handleEvent(event: GameEvent): void {
        switch (event.type) {
            case GameEvents.START_BOSS_FIGHT:
                this.handleStartBossFight();
                break;
            case GameEvents.RIFLE_HIT:
                this.handleRifleHit(event.data.get("node"));
                break;
            case GameEvents.SHOTGUN_HIT:
                this.handleShotgunHit(event.data.get("node"));
                break;
            case GameEvents.GRAPPLE_HIT:
                this.handleGrappleHit(event.data.get("node"), event.data.get("other"));
                break;
        }
    }

    protected handleStartBossFight(): void {
        this.idleTimer.start();
    }


    protected handleRifleHit(particleId: number): void {
        let particles = this.owner.getScene().getRifleParticlePool();
        let particle = particles.find(particle => particle.id === particleId);
        if (this.owner.collisionShape.getBoundingRect().overlaps(particle.collisionShape.getBoundingRect())) {
            //console.log("RIFLE HIT DOG")
            this._health -= 10;
            particle.position = Vec2.ZERO;
            particle.color = Color.TRANSPARENT;
            //particle.collisionShape = new AABB(Vec2.ZERO, Vec2.ZERO);
            particle.vel = Vec2.ZERO;
            let hitAudio = this.owner.getScene().getHitAudioKey();
            this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: hitAudio, loop: false, holdReference: false});
        }
    }

    protected handleShotgunHit(particleId: number): void {
        let particles = this.owner.getScene().getShotgunParticlePool();
        let particle = particles.find(particle => particle.id === particleId);
        if (this.owner.collisionShape.getBoundingRect().overlaps(particle.collisionShape.getBoundingRect())) {
            //console.log("SHOTGUN HIT DOG")
            this._health -= 5;
            particle.position = Vec2.ZERO;
            particle.color = Color.TRANSPARENT;
            //.collisionShape = new AABB(Vec2.ZERO, Vec2.ZERO);
            particle.vel = Vec2.ZERO;
            let hitAudio = this.owner.getScene().getHitAudioKey();
            this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: hitAudio, loop: false, holdReference: false});
        }
    }

    protected handleGrappleHit(node: number, other: number): void {
        if (this.owner.id === other) {
            //console.log("GRAPPLE HIT DOG")
        }
    }

    public get velocity(): Vec2 {
        return this._velocity;
    }
    public set velocity(velocity: Vec2) {
        this._velocity = velocity;
    }
    public get goLeft(): boolean {
        return this._goLeft;
    }
    public set goLeft(goLeft: boolean) {
        this._goLeft = goLeft;
    }
    public get biteLeft(): boolean {
        return this._biteLeft;
    }
    public set biteLeft(biteLeft: boolean) {
        this._biteLeft = biteLeft;
    }

    public get health(): number {
        return this._health;
    }
    public set health(health: number) {
        this._health = MathUtils.clamp(health, 0, this.maxHealth);
        this.emitter.fireEvent(GameEvents.BOSS_HEALTH_CHANGE, {curhpBoss: this.health, maxhpBoss: this.maxHealth});
    }

    public get maxHealth(): number { return this._maxHealth; }
    public set maxHealth(maxHealth: number) { 
        this._maxHealth = maxHealth; 
        // When the health changes, fire an event up to the scene.
        this.emitter.fireEvent(GameEvents.BOSS_HEALTH_CHANGE, {curhpBoss: this.health, maxhpBoss: this.maxHealth});
    }
}   