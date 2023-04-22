import Vec2 from "../../../Wolfie2D/DataTypes/Vec2";
import GameEvent from "../../../Wolfie2D/Events/GameEvent";
import Timer from "../../../Wolfie2D/Timing/Timer";
import RatState from "./RatState";

export default class RatWalk extends RatState {

    handleInput(event: GameEvent): void {
        throw new Error("Method not implemented.");
    }
    public onEnter(options: Record<string, any>): void {

    }

    public update(deltaT: number): void {
        super.update(deltaT);
        // attackbox is in front of its head (rat is facing left)
        // affected by gravity
        // starts moving left until velocity is 0
        // then starts moving right until velocity is 0
        // check if collision between player and rat's attack box. if so, enter attack state

        // based on velocity, set animation to walk left or walk right
        if (this.parent.velocity.x < 0) {
            this.owner.animation.play("RUN_LEFT", true);
        } else if (this.parent.velocity.x > 0) {
            this.owner.animation.play("RUN_RIGHT", true);
        } else {
            this.owner.animation.play("IDLE", true);
        }

        // check if rat is running into a wall.
        // if velocity is positive, check pixels to the right of the rat
        // if velocity is negative, check pixels to the left of the rat
        // if there is a wall, negate the velocity
    

        if (this.parent.velocity.x > 0) {
            // check pixels to the right of the rat
            if (this.parent.tilemap.getTileAtWorldPosition(new Vec2(this.owner.position.x + this.owner.collisionShape.halfSize.x+1, this.owner.position.y)) !== 0) {
                this.parent.velocity.x = -this.parent.velocity.x;
            }
        } else if (this.parent.velocity.x < 0) {
            // check pixels to the left of the rat
            if (this.parent.tilemap.getTileAtWorldPosition(new Vec2(this.owner.position.x - this.owner.collisionShape.halfSize.x-1, this.owner.position.y)) !== 0) {
                this.parent.velocity.x = -this.parent.velocity.x;
            }
        }

        this.owner.move(this.parent.velocity.scaled(deltaT));

    }
    

    public onExit(): Record<string, any> {
        return {};
    }
}