import State from "../../../Wolfie2D/DataTypes/State/State";
import GameEvent from "../../../Wolfie2D/Events/GameEvent";
import HW3AnimatedSprite from "../../Nodes/HW3AnimatedSprite";
import ChickenAI from "./ChickenAI";

export default abstract class ChickenState extends State {
    protected parent: ChickenAI;
    protected owner: HW3AnimatedSprite;
    protected gravity: number;

    public constructor(parent: ChickenAI, owner: HW3AnimatedSprite){
        super(parent);
        this.owner = owner;
        this.gravity = 1250;
    }

    public abstract onEnter(options: Record<string, any>): void;

    public handleInput(event: GameEvent): void {
        switch(event.type) {
            // Default - throw an error
            default: {
                throw new Error(`Unhandled event in RatState of type ${event.type}`);
            }
        }
    }

    public update(deltaT: number): void {

    }

    public abstract onExit(): Record<string, any>;
}