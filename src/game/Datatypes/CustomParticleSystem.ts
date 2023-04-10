import { GraphicType } from "../../Wolfie2D/Nodes/Graphics/GraphicTypes";
import Particle from "../../Wolfie2D/Nodes/Graphics/Particle";
import ParticleSystem from "../../Wolfie2D/Rendering/Animations/ParticleSystem";
import Scene from "../../Wolfie2D/Scene/Scene";

export default class CustomParticleSystem extends ParticleSystem {

    protected spriteKey: string;

    initializePool(scene: Scene, layer: string) {
        this.spriteKey = "KERNEL_SPRITE_KEY"
        for (let i = 0; i < this.particlePool.length; i++) {
            this.particlePool[i] = <Particle><unknown>scene.add.sprite(this.spriteKey, layer)
            this.particlePool[i].position = this.sourcePoint.clone();
            this.particlePool[i].size = this.particleSize.clone();
            this.particlePool[i].mass = this.particleMass;
            this.particlePool[i].addPhysics();
            this.particlePool[i].isCollidable = false;
            this.particlePool[i].visible = false;
        }
    }
}