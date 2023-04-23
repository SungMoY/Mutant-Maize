import StateMachineAI from "../../../Wolfie2D/AI/StateMachineAI";
import AABB from "../../../Wolfie2D/DataTypes/Shapes/AABB";
import Vec2 from "../../../Wolfie2D/DataTypes/Vec2";
import GameEvent from "../../../Wolfie2D/Events/GameEvent";
import OrthogonalTilemap from "../../../Wolfie2D/Nodes/Tilemaps/OrthogonalTilemap";
import Timer from "../../../Wolfie2D/Timing/Timer";
import Color from "../../../Wolfie2D/Utils/Color";
import { GameEvents } from "../../GameEvents";
import HW3AnimatedSprite from "../../Nodes/HW3AnimatedSprite";
import { LevelLayers } from "../../Scenes/Level";
import RatGrappleStunned from "./RatGrappleStunned";
import RatMove from "./RatMove";
import RatTakingDamage from "./RatTakingDamage";

export default class RatAI extends StateMachineAI {

    public readonly MAX_SPEED: number = 400;
    public readonly MIN_SPEED: number = 275;

    protected owner: HW3AnimatedSprite;

    protected _velocity: Vec2;

    protected isDead: boolean;

    protected _health: number;

    public tilemap: OrthogonalTilemap;

    public hurtTimer: Timer;

    public deathTimer: Timer;

    public grappleStunTimer: Timer;

    public initializeAI(owner: HW3AnimatedSprite, options: Record<string, any>): void {
        this.owner = owner;
        this._velocity = new Vec2(150, 275)
        this._health = 50;
        this.tilemap = this.owner.getScene().getTilemap(options.tilemap) as OrthogonalTilemap;

        this.hurtTimer = new Timer(360, () => {
            if (this._health <= 0) {
                this.owner.collisionShape = new AABB(Vec2.ZERO, Vec2.ZERO);
                this.owner.animation.play("DYING", false);
                this.deathTimer.start();
            } else {
                this.changeState("MOVE")
            }
        }, false);

        this.deathTimer = new Timer(1000, () => {
            this.owner.destroy();
        }, false);

        this.grappleStunTimer = new Timer(1000, () => {}, false);

        this.addState("MOVE", new RatMove(this, this.owner));
        this.addState("TAKING_DAMAGE", new RatTakingDamage(this, this.owner));
        this.addState("GRAPPLE_STUNNED", new RatGrappleStunned(this, this.owner));
        this.initialize("MOVE")

        this.receiver.subscribe(GameEvents.RIFLE_HIT);
        this.receiver.subscribe(GameEvents.SHOTGUN_HIT);
        this.receiver.subscribe(GameEvents.GRAPPLE_HIT);
    }

    public update(deltaT: number): void {
        super.update(deltaT);

    }

    handleEvent(event: GameEvent): void {
        switch (event.type) {
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

    protected handleRifleHit(particleId: number): void {
        let particles = this.owner.getScene().getRifleParticlePool();
        let particle = particles.find(particle => particle.id === particleId);
        if (this.owner.collisionShape.getBoundingRect().overlaps(particle.collisionShape.getBoundingRect())) {
            this.changeState("TAKING_DAMAGE");
            this._health -= 20;
            particle.position = Vec2.ZERO;
            particle.color = Color.TRANSPARENT;
        }
    }

    protected handleShotgunHit(particleId: number): void {
        let particles = this.owner.getScene().getShotgunParticlePool();
        let particle = particles.find(particle => particle.id === particleId);
        if (this.owner.collisionShape.getBoundingRect().overlaps(particle.collisionShape.getBoundingRect())) {
            this.changeState("TAKING_DAMAGE");
            this._health -= 10;
            particle.position = Vec2.ZERO;
            particle.color = Color.TRANSPARENT;
        }
    }

    protected handleGrappleHit(node: number, other: number): void {
        // i cant implement a stun mechanic because it is difficult to retrieve which rat was hit
        if (this.owner.id === other) {
            this.changeState("GRAPPLE_STUNNED");
        }
    }

    public get velocity(): Vec2 {
        return this._velocity;
    }
    public set velocity(velocity: Vec2) {
        this._velocity = velocity;
    }
}   