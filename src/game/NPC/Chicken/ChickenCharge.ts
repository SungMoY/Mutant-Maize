import { GameEventType } from "../../../Wolfie2D/Events/GameEventType";
import ChickenState from "./ChickenState";

export default class ChickenCharge extends ChickenState {

    public onEnter(options: Record<string, any>): void {
        if (this.parent.velocity.x < 0) {
            this.owner.animation.play("CHARGE_LEFT", true);
        } else if (this.parent.velocity.x > 0) {
            this.owner.animation.play("CHARGE_RIGHT", true);
        }

        this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: this.owner.getScene().getChickenWalkingAudioKey(), loop: true, holdReference: true});
    }

    public update(deltaT: number): void {
        super.update(deltaT);
    }

    public onExit(): Record<string, any> {
        this.emitter.fireEvent(GameEventType.STOP_SOUND, {key: this.owner.getScene().getChickenWalkingAudioKey()});
        return;
    }
}