import StateMachineAI from "../../../Wolfie2D/AI/StateMachineAI";
import StateMachineGoapAI from "../../../Wolfie2D/AI/StateMachineGoapAI";
import GoapAction from "../../../Wolfie2D/DataTypes/Interfaces/GoapAction";
import AABB from "../../../Wolfie2D/DataTypes/Shapes/AABB";
import Vec2 from "../../../Wolfie2D/DataTypes/Vec2";
import OrthogonalTilemap from "../../../Wolfie2D/Nodes/Tilemaps/OrthogonalTilemap";
import Timer from "../../../Wolfie2D/Timing/Timer";
import { GameEvents } from "../../GameEvents";
import HW3AnimatedSprite from "../../Nodes/HW3AnimatedSprite";
import RatMove from "./RatWalk";

export default class RatAI extends StateMachineAI {

    public readonly MAX_SPEED: number = 400;
    public readonly MIN_SPEED: number = 275;

    protected owner: HW3AnimatedSprite;

    protected _velocity: Vec2;

    protected isDead: boolean;

    protected _health: number;

    protected damageZone: AABB

    protected _direction: Vec2;

    public tilemap: OrthogonalTilemap;

    public initializeAI(owner: HW3AnimatedSprite, options: Record<string, any>): void {
        this.owner = owner;
        this._velocity = new Vec2(275, 275)
        this.isDead = false;
        this._health = 100;
        this.tilemap = this.owner.getScene().getTilemap(options.tilemap) as OrthogonalTilemap;


        this.addState("MOVE", new RatMove(this, this.owner));

        this.initialize("MOVE")

    }

    public update(deltaT: number): void {
        super.update(deltaT);
    }

    public get direction(): Vec2 {
        return this.direction;
    }
    public set direction(direction: Vec2) {
        this.direction = direction;
    }
    public get velocity(): Vec2 {
        return this._velocity;
    }
    public set velocity(velocity: Vec2) {
        this._velocity = velocity;
    }
}   