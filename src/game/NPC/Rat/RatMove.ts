import Vec2 from "../../../Wolfie2D/DataTypes/Vec2";
import GameEvent from "../../../Wolfie2D/Events/GameEvent";
import RatState from "./RatState";

export default class RatWalk extends RatState {

    handleInput(event: GameEvent): void {
        throw new Error("Method not implemented.");
    }
    public onEnter(options: Record<string, any>): void {
        if (this.parent.velocity.x < 0) {
            this.owner.animation.playIfNotAlready("RUN_LEFT", true);
        } else if (this.parent.velocity.x > 0) {
            this.owner.animation.playIfNotAlready("RUN_RIGHT", true);
        } else {
            this.owner.animation.playIfNotAlready("IDLE", false);
        }
    }

    public update(deltaT: number): void {
        super.update(deltaT);

        if (this.parent.velocity.x < 0) {
            this.owner.animation.playIfNotAlready("RUN_LEFT", true);
            if (this.parent.tilemap.getTileAtWorldPosition(new Vec2(this.owner.position.x - this.owner.collisionShape.halfSize.x-1, this.owner.position.y)) !== 0) {
                this.parent.velocity.x = -this.parent.velocity.x;
            }
        } else if (this.parent.velocity.x > 0) {
            this.owner.animation.playIfNotAlready("RUN_RIGHT", true);
            if (this.parent.tilemap.getTileAtWorldPosition(new Vec2(this.owner.position.x + this.owner.collisionShape.halfSize.x+1, this.owner.position.y)) !== 0) {
                this.parent.velocity.x = -this.parent.velocity.x;
            }
        } else {
            this.owner.animation.playIfNotAlready("IDLE", false);
        }

        this.owner.move(this.parent.velocity.scaled(deltaT));
    }
    

    public onExit(): Record<string, any> {
        return {};
    }
}