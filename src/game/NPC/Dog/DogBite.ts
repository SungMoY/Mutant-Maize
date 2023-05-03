import { GameEventType } from "../../../Wolfie2D/Events/GameEventType";
import DogState from "./DogState";


export default class DogBite extends DogState {

    public onEnter(options: Record<string, any>): void {
        if (this.parent.goLeft) {
            this.owner.animation.play("EGG_LEFT", false);
        } else {
            this.owner.animation.play("EGG_RIGHT", false);
        }

        //this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: this.owner.getScene().getChickenEggAudioKey(), loop: false, holdReference: true});
    }

    public update(deltaT: number): void {
        super.update(deltaT);
    }

    public onExit(): Record<string, any> {
        //this.emitter.fireEvent(GameEventType.STOP_SOUND, {key: this.owner.getScene().getChickenEggAudioKey()});
        return;
    }
}