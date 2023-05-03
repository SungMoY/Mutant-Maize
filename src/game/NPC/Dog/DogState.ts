import State from "../../../Wolfie2D/DataTypes/State/State";
import GameEvent from "../../../Wolfie2D/Events/GameEvent";
import HW3AnimatedSprite from "../../Nodes/HW3AnimatedSprite";
import DogAI from "./DogAI";

export default abstract class DogState extends State {
    protected parent: DogAI;
    protected owner: HW3AnimatedSprite;
    protected gravity: number;

    public constructor(parent: DogAI, owner: HW3AnimatedSprite){
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