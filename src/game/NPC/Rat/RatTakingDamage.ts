import AABB from "../../../Wolfie2D/DataTypes/Shapes/AABB";
import Vec2 from "../../../Wolfie2D/DataTypes/Vec2";
import GameEvent from "../../../Wolfie2D/Events/GameEvent";
import RatState from "./RatState";
import { GameEventType } from "../../../Wolfie2D/Events/GameEventType";

export default class RatTakingDamage extends RatState {

    handleInput(event: GameEvent): void {
        throw new Error("Method not implemented.");
    }
    public onEnter(options: Record<string, any>): void {
        // plays hurt sound
        let hitAudio = this.owner.getScene().getHitAudioKey()
        this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: hitAudio, loop: false, holdReference: false});

        if (this.parent.health <= 0) {
            this.owner.collisionShape = new AABB(Vec2.ZERO, Vec2.ZERO);
            this.owner.animation.play("DYING", false);
            this.parent.deathTimer.start();

            // plays dying sound
            let dyingAudio = this.owner.getScene().getMobDeathAudioKey();
            this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: dyingAudio, loop: false, holdReference: false});
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