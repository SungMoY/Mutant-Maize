import AABB from "../../../Wolfie2D/DataTypes/Shapes/AABB";
import Vec2 from "../../../Wolfie2D/DataTypes/Vec2";
import GameEvent from "../../../Wolfie2D/Events/GameEvent";
import BirdState from "./BirdState";

export default class BirdTakingDamage extends BirdState {

    handleInput(event: GameEvent): void {
        throw new Error("Method not implemented.");
    }
    public onEnter(options: Record<string, any>): void {
        if (this.parent.health <= 0) {
            this.owner.collisionShape = new AABB(Vec2.ZERO, Vec2.ZERO);
            this.owner.animation.play("DYING", false);
            this.parent.deathTimer.start();
        } else {
            this.owner.animation.play("TAKING_DAMAGE", false);
            this.parent.hurtTimer.start();
        }
    }

    public update(deltaT: number): void {
        super.update(deltaT);

    }
    
    public onExit(): Record<string, any> {
        return {};
    }
}