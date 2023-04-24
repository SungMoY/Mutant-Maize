import GameEvent from "../../../Wolfie2D/Events/GameEvent";
import BirdState from "./BirdState";

export default class BirdMove extends BirdState {
    
    handleInput(event: GameEvent): void {
        throw new Error("Method not implemented.");
    }

    public onEnter(options: Record<string, any>): void {
        if (this.parent.velocity.x < 0) {
            this.owner.animation.playIfNotAlready("RUN_LEFT", true);
        } else if (this.parent.velocity.x > 0) {
            this.owner.animation.playIfNotAlready("RUN_RIGHT", true);
        }
    }

    public update(deltaT: number): void {
        super.update(deltaT);
        if (this.parent.velocity.x < 0) {
            this.owner.animation.playIfNotAlready("RUN_LEFT", true);
        } else if (this.parent.velocity.x > 0) {
            this.owner.animation.playIfNotAlready("RUN_RIGHT", true);
        }
        this.owner.move(this.parent.velocity.scaled(deltaT));

    }


    public onExit(): Record<string, any> {
        return {};
    }
}