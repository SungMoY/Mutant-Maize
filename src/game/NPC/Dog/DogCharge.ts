import { GameEventType } from "../../../Wolfie2D/Events/GameEventType";
import DogState from "./DogState";


export default class DogCharge extends DogState {

    public onEnter(options: Record<string, any>): void {
        if (this.parent.velocity.x < 0) {
            this.owner.animation.play("CHARGE_LEFT", true);
        } else if (this.parent.velocity.x > 0) {
            this.owner.animation.play("CHARGE_RIGHT", true);
        }
    }

    //this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: this.owner.getScene().getDogWalkingAudioKey(), loop: true, holdReference: true});

    public update(deltaT: number): void {
        super.update(deltaT);
    }

    public onExit(): Record<string, any> {
        //this.emitter.fireEvent(GameEventType.STOP_SOUND, {key: this.owner.getScene().getDogWalkingAudioKey()});
        return;
    }
}