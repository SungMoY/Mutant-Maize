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

import MathUtils from "../../../Wolfie2D/Utils/MathUtils";
import Label from "../../../Wolfie2D/Nodes/UIElements/Label";
import { UIElementType } from "../../../Wolfie2D/Nodes/UIElements/UIElementTypes";
import { LevelLayers } from "../../Scenes/Level";

export default class ChickenAI extends StateMachineAI {
    
    public readonly MAX_SPEED: number = 500;
    public readonly MIN_SPEED: number = 275;

    protected owner: HW3AnimatedSprite;
    protected _velocity: Vec2;

    protected _health: number;
    protected _maxHealth: number;

    protected _goLeft: boolean

    protected idleTimer: Timer;
    protected chargeTimer: Timer;
    protected eggTimer: Timer;

    protected isDead: boolean;

    protected eggSystem: Egg;

    protected healthBar: Label;
    protected healthBarHealth: Label;

    public initializeAI(owner: HW3AnimatedSprite, options: Record<string, any>): void {
        this.owner = owner;
        this._velocity = new Vec2(0, 0)

        this.health = 500;
        this.maxHealth = 500;

        this.goLeft = true;
        this.eggSystem = options.eggSystem;

        this.addState("IDLE", new ChickenIdle(this, this.owner));
        this.addState("CHARGE", new ChickenCharge(this, this.owner));
        this.addState("EGG", new ChickenEgg(this, this.owner));
        this.initialize("IDLE");

        let bossHPSize = new Vec2(900, 40)
        let bossHPPos = new Vec2(480, 670) 

        let scene = this.owner.getScene();

        this.healthBar = <Label>scene.add.uiElement(UIElementType.LABEL, LevelLayers.UI, {position: bossHPPos, text: ""});
        this.healthBar.size = bossHPSize;
        this.healthBar.backgroundColor = Color.RED;
        this.healthBar.borderColor = Color.BLACK;
        this.healthBar.borderRadius = 0;
        this.healthBar.visible = false;

        // boss HP
		this.healthBarHealth = <Label>scene.add.uiElement(UIElementType.LABEL, LevelLayers.UI, {position: bossHPPos, text: ""});
		this.healthBarHealth.size = bossHPSize;
        this.healthBarHealth.backgroundColor = Color.YELLOW;
        this.healthBar.borderColor = Color.BLACK;
        this.healthBarHealth.borderRadius = 0;
        this.healthBarHealth.visible = false;

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
            this.eggSystem.stopSystem();
            this.healthBar.visible = false;
            this.healthBarHealth.visible = false;
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
        this.healthBar.visible = true;
        this.healthBarHealth.visible = true;
    }

    protected handleBossHealthChange(currentHealth: number, maxHealth: number): void {
        let ratio = this.healthBar.size.x / maxHealth;

        this.healthBarHealth.size = new Vec2(currentHealth * ratio, this.healthBar.size.y)
        this.healthBarHealth.position = new Vec2(this.healthBar.position.x - this.healthBar.size.x / 2 + this.healthBarHealth.size.x / 2, this.healthBarHealth.position.y);
    }

    protected handleRifleHit(particleId: number): void {
        let particles = this.owner.getScene().getRifleParticlePool();
        let particle = particles.find(particle => particle.id === particleId);
        if (this.owner.collisionShape.getBoundingRect().overlaps(particle.collisionShape.getBoundingRect())) {
            //console.log("RIFLE HIT CHICKEN")
            this.health -= 10;
            this.handleBossHealthChange(this.health, this.maxHealth);
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
            this.health -= 1.5;
            this.handleBossHealthChange(this.health, this.maxHealth);
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
    
    public get goLeft(): boolean {
        return this._goLeft;
    }
    public set goLeft(goLeft: boolean) {
        this._goLeft = goLeft;
    }

    public get health(): number {
        return this._health;
    }
    public set health(health: number) {
        this._health = MathUtils.clamp(health, 0, this.maxHealth);
    }

    public get maxHealth(): number { return this._maxHealth; }

    public set maxHealth(maxHealth: number) {
        this._maxHealth = maxHealth;
    }
}   