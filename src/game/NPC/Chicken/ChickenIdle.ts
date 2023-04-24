import ChickenState from "./ChickenState";

export default class ChickenIdle extends ChickenState {

    public onEnter(options: Record<string, any>): void {
        this.owner.animation.playIfNotAlready("IDLE", true);
    }

    public update(deltaT: number): void {
        super.update(deltaT);
        // update y position based on gravity
        this.parent.velocity.y += this.gravity*deltaT;
        this.parent.velocity.x = 0;
    }

    public onExit(): Record<string, any> {
        return;
    }
}