import Vec2 from "../../../Wolfie2D/DataTypes/Vec2";
import GameEvent from "../../../Wolfie2D/Events/GameEvent";
import Timer from "../../../Wolfie2D/Timing/Timer";
import RatState from "./RatState";

export default class RatTakingDamage extends RatState {

    handleInput(event: GameEvent): void {
        throw new Error("Method not implemented.");
    }
    public onEnter(options: Record<string, any>): void {
        console.log("RAT WAS GRAPPLED STUNNED")
        this.owner.animation.play("TAKING_DAMAGE", false);
        this.parent.grappleStunTimer.start();
    }

    public update(deltaT: number): void {
        super.update(deltaT);

    }
    

    public onExit(): Record<string, any> {
        return {};
    }
}