import StateMachineAI from "../../../Wolfie2D/AI/StateMachineAI";
import AABB from "../../../Wolfie2D/DataTypes/Shapes/AABB";
import Vec2 from "../../../Wolfie2D/DataTypes/Vec2";
import GameEvent from "../../../Wolfie2D/Events/GameEvent";
import OrthogonalTilemap from "../../../Wolfie2D/Nodes/Tilemaps/OrthogonalTilemap";
import { GameEvents } from "../../GameEvents";
import HW3AnimatedSprite from "../../Nodes/HW3AnimatedSprite";
import RatMove from "./RatMove";

export default class RatAI extends StateMachineAI {

    public readonly MAX_SPEED: number = 400;
    public readonly MIN_SPEED: number = 275;

    protected owner: HW3AnimatedSprite;

    protected _velocity: Vec2;

    protected isDead: boolean;

    protected _health: number;

    public tilemap: OrthogonalTilemap;

    public initializeAI(owner: HW3AnimatedSprite, options: Record<string, any>): void {
        this.owner = owner;
        this._velocity = new Vec2(200, 275)
        this._health = 50;
        this.tilemap = this.owner.getScene().getTilemap(options.tilemap) as OrthogonalTilemap;

        this.addState("MOVE", new RatMove(this, this.owner));
        this.initialize("MOVE")

        this.receiver.subscribe(GameEvents.RIFLE_HIT);
        this.receiver.subscribe(GameEvents.SHOTGUN_HIT);
        this.receiver.subscribe(GameEvents.GRAPPLE_HIT);
    }

    public update(deltaT: number): void {
        super.update(deltaT);

        if (this._health <= 0) {
            this.owner.destroy();
        }
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
                this.handleGrappleHit(event.data.get("node"));
                break;
        }
    }

    protected handleRifleHit(particleId: number): void {
        let particles = this.owner.getScene().getRifleParticlePool();
        let particle = particles.find(particle => particle.id === particleId);
        if (this.owner.collisionShape.getBoundingRect().overlaps(particle.collisionShape.getBoundingRect())) {
            console.log("rifle collision")
            this._health -= 20;
            particle.position = Vec2.ZERO;
        }
    }

    protected handleShotgunHit(particleId: number): void {
        let particles = this.owner.getScene().getShotgunParticlePool();
        let particle = particles.find(particle => particle.id === particleId);
        if (this.owner.collisionShape.getBoundingRect().overlaps(particle.collisionShape.getBoundingRect())) {
            console.log("shotgun collision", particleId)
            this._health -= 10;
            particle.position = Vec2.ZERO;
        }
    }

    protected handleGrappleHit(particleId: number): void {
        let particles = this.owner.getScene().getGrappleParticlePool();
        let particle = particles.find(particle => particle.id === particleId);
        if (this.owner.collisionShape.getBoundingRect().overlaps(particle.collisionShape.getBoundingRect())) {
            console.log("grapple collision")
        }
    }

    public get velocity(): Vec2 {
        return this._velocity;
    }
    public set velocity(velocity: Vec2) {
        this._velocity = velocity;
    }
}   