import GameEvent from "../../../Wolfie2D/Events/GameEvent";
import BirdState from "./BirdState";

export default class BirdGrappleStunned extends BirdState {

    handleInput(event: GameEvent): void {
        throw new Error("Method not implemented.");
    }
    public onEnter(options: Record<string, any>): void {
        this.owner.animation.play("STUNNED", false);
        this.parent.grappleStunTimer.start();
    }

    public update(deltaT: number): void {
        super.update(deltaT);
        this.owner.move(this.parent.velocity.scaled(deltaT));

    }

    public onExit(): Record<string, any> {
        return {};
    }
}