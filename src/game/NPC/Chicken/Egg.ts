import AABB from "../../../Wolfie2D/DataTypes/Shapes/AABB";
import Vec2 from "../../../Wolfie2D/DataTypes/Vec2";
import Particle from "../../../Wolfie2D/Nodes/Graphics/Particle";
import Sprite from "../../../Wolfie2D/Nodes/Sprites/Sprite";
import ParticleSystem from "../../../Wolfie2D/Rendering/Animations/ParticleSystem";
import Timer from "../../../Wolfie2D/Timing/Timer";
import Color from "../../../Wolfie2D/Utils/Color";
import { GameEvents } from "../../GameEvents";
import { GamePhysicsGroups } from "../../GamePhysicsGroups";

export default class Egg extends ParticleSystem {
    //facedir variable
    private faceDir: Vec2;

    private particleSprite: Sprite;

    public getPool(): Readonly<Array<Particle>> {
        return this.particlePool;
    }

    startSystem(time: number, mass?: number, startPoint?: Vec2, faceDir?: Vec2) {
        this.faceDir = faceDir;
        //Stop the system to reset all particles
        this.stopSystem();

        //Set the timer
        this.systemLifetime = new Timer(time, () => {this.getPool()[0].position = Vec2.ZERO}, false);

        //Update optional parameters
        if (mass !== undefined)
            this.particleMass = mass;

        if (startPoint !== undefined)
            this.sourcePoint = startPoint;

        //Start the timer, set flags, and give the initial amount of particles to render
        this.systemLifetime.start();
        this.systemRunning = true;
        this.particlesToRender = this.particlesPerFrame;
    }

    /**
     * @returns true if the particle system is running; false otherwise.
     */
    public isSystemRunning(): boolean { return this.systemRunning; }

    /**
     * Sets the animations for a particle in the player's weapon
     * @param particle the particle to give the animation to
     */
    public setParticleAnimation(particle: Particle) {

        particle.vel = new Vec2(this.faceDir.x * 1.5, 0);

        // set each particle's group to physics group
        particle.setGroup(GamePhysicsGroups.ENTITY);
        particle.setTrigger(GamePhysicsGroups.PLAYER, GameEvents.PLAYER_HIT, null);

        particle.color = Color.WHITE;
        particle.size = new Vec2(25, 25);

        particle.tweens.add("active", {
            startDelay: 0,
            duration: this.lifetime,
            effects: []
        });
    }

}