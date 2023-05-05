import StateMachineAI from "../../../Wolfie2D/AI/StateMachineAI";
import AABB from "../../../Wolfie2D/DataTypes/Shapes/AABB";
import Vec2 from "../../../Wolfie2D/DataTypes/Vec2";
import GameEvent from "../../../Wolfie2D/Events/GameEvent";
import Timer from "../../../Wolfie2D/Timing/Timer";
import Color from "../../../Wolfie2D/Utils/Color";
import { GameEvents } from "../../GameEvents";
import HW3AnimatedSprite from "../../Nodes/HW3AnimatedSprite";
import ChickenIdle from "./ChickenIdle";
import ChickenCharge from "./ChickenCharge";
import ChickenEgg from "./ChickenEgg";
import { GameEventType } from "../../../Wolfie2D/Events/GameEventType";
import Egg from "./Egg";

export default class ChickenAI extends StateMachineAI {
    
    public readonly MAX_SPEED: number = 500;
    public readonly MIN_SPEED: number = 275;

    protected owner: HW3AnimatedSprite;
    protected _velocity: Vec2;
    protected _health: number;

    protected _goLeft: boolean

    protected idleTimer: Timer;
    protected chargeTimer: Timer;
    protected eggTimer: Timer;

    protected isDead: boolean;

    protected eggSystem: Egg;

    public initializeAI(owner: HW3AnimatedSprite, options: Record<string, any>): void {
        this.owner = owner;
        this._velocity = new Vec2(0, 0)
        this._health = 500;
        this.goLeft = true;
        this.eggSystem = options.eggSystem;

        this.addState("IDLE", new ChickenIdle(this, this.owner));
        this.addState("CHARGE", new ChickenCharge(this, this.owner));
        this.addState("EGG", new ChickenEgg(this, this.owner));
        this.initialize("IDLE");

        this.idleTimer = new Timer(1500, () => {
            let random = Math.random();
            //console.log("random: " + random)
            if (random < 0.5) {
                if (this.goLeft) {
                    this.velocity.x = -this.MAX_SPEED;
                    this.goLeft = false;
                } else {
                    this.velocity.x = this.MAX_SPEED;
                    this.goLeft = true;
                }
                this.changeState("CHARGE");
                this.chargeTimer.start();
            } else {
                this.changeState("EGG");
                // fire egg here, customize its properties
                let position = new Vec2(this.owner.position.x, this.owner.position.y +50)
                let direction
                if (this.goLeft) { direction = new Vec2(-500, 0) } else { direction = new Vec2(500, 0)}
                this.eggSystem.startSystem(1000, 0, position, direction);
                this.eggTimer.start();
            }
        }, false);

        this.chargeTimer = new Timer(1500, () => {
            this.changeState("IDLE")
            this.idleTimer.start();
        }, false);

        this.eggTimer = new Timer(1000, () => {
            this.eggSystem.stopSystem();
            this.changeState("IDLE")
            this.idleTimer.start();
        }, false);

        this.receiver.subscribe(GameEvents.RIFLE_HIT);
        this.receiver.subscribe(GameEvents.SHOTGUN_HIT);
        this.receiver.subscribe(GameEvents.GRAPPLE_HIT);
        this.receiver.subscribe(GameEvents.START_BOSS_FIGHT);
    }

    public update(deltaT: number): void {
        super.update(deltaT);
        this.owner.move(this.velocity.scaled(deltaT));

        if (this._health <= 0 && !this.isDead) {
            this.emitter.fireEvent(GameEvents.BOSS_DEAD);
            // handle all boss dying related stuff here
            this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: this.owner.getScene().getChickenDyingAudioKey(), loop: false, holdReference: true})
            this.emitter.fireEvent(GameEventType.STOP_SOUND, {key: this.owner.getScene().getChickenEggAudioKey()});
            this.emitter.fireEvent(GameEventType.STOP_SOUND, {key: this.owner.getScene().getChickenWalkingAudioKey()});
            this.isDead = true;
            this.idleTimer.pause();
            this.chargeTimer.pause();
            this.eggTimer.pause();
            this.owner.destroy();
            }
        
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
            //console.log("RIFLE HIT CHICKEN")
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
            //console.log("SHOTGUN HIT CHICKEN")
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
            //console.log("GRAPPLE HIT CHICKEN")
        }
    }

    public get velocity(): Vec2 {
        return this._velocity;
    }
    public set velocity(velocity: Vec2) {
        this._velocity = velocity;
    }
    public get health(): number {
        return this._health;
    }
    public set health(health: number) {
        this._health = health;
    }
    public get goLeft(): boolean {
        return this._goLeft;
    }
    public set goLeft(goLeft: boolean) {
        this._goLeft = goLeft;
    }
}   