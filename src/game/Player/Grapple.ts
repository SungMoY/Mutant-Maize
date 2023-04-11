import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import Particle from "../../Wolfie2D/Nodes/Graphics/Particle";
import ParticleSystem from "../../Wolfie2D/Rendering/Animations/ParticleSystem";
import Timer from "../../Wolfie2D/Timing/Timer";
import Color from "../../Wolfie2D/Utils/Color";
import { EaseFunctionType } from "../../Wolfie2D/Utils/EaseFunctions";
import RandUtils from "../../Wolfie2D/Utils/RandUtils";
import { GamePhysicsGroups } from "../GamePhysicsGroups";

 

/**
 * // TODO change up particleSystem so that instead of particles, it is a bunch of sprites
 * ALSO separate the pool of particles such that rifle particles do not show up in shotgun particles
 * this requires further extending ParticleSystem for Rifle and Shotgun so that it is more unique
 * 
 * The particle system used for the player's attack. Particles in the particle system should
 * be spawned at the player's position and fired in the direction of the mouse's position.
 */
export default class Grapple extends ParticleSystem {

    //facedir variable
    private faceDir: Vec2;

    public getPool(): Readonly<Array<Particle>> {
        return this.particlePool;
    }

    startSystem(time: number, mass?: number, startPoint?: Vec2, faceDir?: Vec2) {
        this.faceDir = faceDir.scale(100);
        //Stop the system to reset all particles
        this.stopSystem();

        //Set the timer
        this.systemLifetime = new Timer(time);

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
        let fact = 5.125; // larger factor = wider and farther

        particle.vel = new Vec2(this.faceDir.x*fact,this.faceDir.y*fact);

        // set each particle's group to physics group
        particle.setGroup(GamePhysicsGroups.PLAYER_WEAPON);

        particle.color = new Color(34, 200, 34, 1)
        particle.size = new Vec2(10, 10)
    }

}