import { PlayerStates, PlayerAnimations } from "../PlayerController";
import Input from "../../../Wolfie2D/Input/Input";
import { GameControls } from "../../GameControls";
import PlayerState from "./PlayerState";
import { GameEventType } from "../../../Wolfie2D/Events/GameEventType";
import Timer from "../../../Wolfie2D/Timing/Timer";

export default class Walk extends PlayerState {
    protected walkAudioTimer: Timer;

	onEnter(options: Record<string, any>): void {
        // based on velocity, play run_left or run_right
        this.parent.speed = this.parent.MIN_SPEED;
        if (this.parent.velocity.x < 0) {
            this.owner.animation.play(PlayerAnimations.RUN_LEFT, true);
        } else {
            this.owner.animation.play(PlayerAnimations.RUN_RIGHT, true);
        }

        this.walkAudioTimer = new Timer(400);
	}

	update(deltaT: number): void {
        // Call the update method in the parent class - updates the direction the player is facing
        super.update(deltaT);

        // Get the input direction from the player controller
		let dir = this.parent.inputDir;

        // If the player is not moving - transition to the Idle state
		if(dir.isZero()){
			this.finished(PlayerStates.IDLE);
		} 
        // If the player hits the jump key - transition to the Jump state
        else if (Input.isJustPressed(GameControls.JUMP)) {
            this.finished(PlayerStates.JUMP);
        } 
        // If the player is not on the ground, transition to the fall state
        else if (!this.owner.onGround && this.parent.velocity.y !== 0) {
            this.finished(PlayerStates.FALL);
        }
        // Otherwise, move the player
        else {
            // Update the vertical velocity of the player
            this.parent.velocity.y += this.gravity*deltaT; 
            this.parent.velocity.x = dir.x * this.parent.speed
            this.owner.move(this.parent.velocity.scaled(deltaT));
        }

        // this can be updated to be better. use the engine's looping instead of timer
        if (this.parent.velocity.x != 0 && this.owner.onGround && this.walkAudioTimer.isStopped()) {
            // plays walking sound
            let walkAudio = this.owner.getScene().getPlayerWalkAudioKey();
            this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: walkAudio, loop: false, holdReference: false});
            this.walkAudioTimer.start();
            //console.log("im walkin here");
        }
	}

	onExit(): Record<string, any> {		
        this.owner.animation.stop();
        this.owner.animation.playIfNotAlready(PlayerAnimations.IDLE, true);
		return {};
	}
}