import GameEvent from "../../../Wolfie2D/Events/GameEvent";
import { GameEventType } from "../../../Wolfie2D/Events/GameEventType";
import Timer from "../../../Wolfie2D/Timing/Timer";
import { GameEvents } from "../../GameEvents";
import { PlayerTweens } from "../PlayerController";
import PlayerState from "./PlayerState";

/**
 * The Dead state for the player's FSM AI. 
 */
export default class Dead extends PlayerState {

    // Trigger the player's death animation when we enter the dead state
    public onEnter(options: Record<string, any>): void {

        this.owner.animation.playIfNotAlready("DYING", false)
        // play dying.mp3
        // Get the dying audio key for the player
        let dyingAudio = this.owner.getScene().getPlayerDyingAudioKey();
        // Play the dying sound for the player
        this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: dyingAudio, loop: false, holdReference: false});

        let deathTimer = new Timer(1000, ()=>{
            this.owner.tweens.play(PlayerTweens.DEATH);
        }, false);
        deathTimer.start();
    }

    // Ignore all events from the rest of the game
    public handleInput(event: GameEvent): void { }

    // Empty update method - if the player is dead, don't update anything
    public update(deltaT: number): void {}

    public onExit(): Record<string, any> { return {}; }
    
}