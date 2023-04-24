import AABB from "../../Wolfie2D/DataTypes/Shapes/AABB";
import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import Level from "./Level";
import RenderingManager from "../../Wolfie2D/Rendering/RenderingManager";
import SceneManager from "../../Wolfie2D/Scene/SceneManager";
import Viewport from "../../Wolfie2D/SceneGraph/Viewport";

import MainMenu from "./MainMenu";
import Level2 from "./Level2";

/**
 * The first level for HW4 - should be the one with the grass and the clouds.
 */
export default class Level1 extends Level {

    public static readonly PLAYER_SPRITE_KEY = "PLAYER_SPRITE_KEY";
    public static readonly PLAYER_SPRITE_PATH = "game_assets/spritesheets/rob_the_cob.json";

    public static readonly TILEMAP_KEY = "LEVEL1";
    public static readonly TILEMAP_PATH = "game_assets/tilemaps/Level_1/level1_map.json";
    public static readonly WALLS_LAYER_KEY = "Main";

    public static readonly LEVEL_MUSIC_KEY = "LEVEL_MUSIC";
    public static readonly LEVEL_MUSIC_PATH = "game_assets/music/hw5_level_music.wav";

    public static readonly JUMP_AUDIO_KEY = "PLAYER_JUMP";
    public static readonly JUMP_AUDIO_PATH = "game_assets/sounds/jump.wav";

    public static readonly DYING_AUDIO_KEY = "DYING_AUDIO";
    public static readonly DYING_AUDIO_PATH = "game_assets/music/dying.mp3";

    public static readonly LEVEL1_BACKGROUND_KEY = "LEVEL1_BACKGROUND";
    public static readonly LEVEL1_BACKGROUND_PATH = "game_assets/images/level1_background.png";

    public static readonly KERNEL_SPRITE_KEY = "KERNEL_SPRITE_KEY";
    public static readonly KERNEL_SPRITE_PATH = "game_assets/sprites/kernel.png";

    public static readonly POPCORN_SPRITE_KEY = "POPCORN_SPRITE_KEY";
    public static readonly POPCORN_SPRITE_PATH = "game_assets/sprites/popcorn.png";

    public static readonly RAT_SPRITE_KEY = "RAT_SPRITE_KEY";
    public static readonly RAT_SPRITE_PATH = "game_assets/spritesheets/rat.json";

    public static readonly BIRD_SPRITE_KEY = "BIRD_SPRITE_KEY";
    public static readonly BIRD_SPRITE_PATH = "game_assets/spritesheets/bird.json";

    public constructor(viewport: Viewport, sceneManager: SceneManager, renderingManager: RenderingManager, options: Record<string, any>) {
        super(viewport, sceneManager, renderingManager, options);
        this.tilemapKey = Level1.TILEMAP_KEY;
        this.tilemapScale = new Vec2(3, 3);
        this.wallsLayerKey = Level1.WALLS_LAYER_KEY;
        this.playerSpriteKey = Level1.PLAYER_SPRITE_KEY;
        this.playerSpawn = new Vec2(100, 500);
        // this.levelMusicKey = Level1.LEVEL_MUSIC_KEY
        this.jumpAudioKey = Level1.JUMP_AUDIO_KEY;
        this.dyingAudioKey = Level1.DYING_AUDIO_KEY;
        this.backgroundKey = Level1.LEVEL1_BACKGROUND_KEY;
        this.levelEndPosition = new Vec2(11328, 528)
        this.levelEndHalfSize = new Vec2(96, 96)
        this.kernelSpriteKey = Level1.KERNEL_SPRITE_KEY;
        this.popcornSpriteKey = Level1.POPCORN_SPRITE_KEY;

        this.ratSpriteKey = Level1.RAT_SPRITE_KEY;
        this.ratPositions = [
            new Vec2(900, 624),
            new Vec2(800, 432),
            new Vec2(2064, 180),
            new Vec2(3684, 630),
            new Vec2(4740, 630),
            new Vec2(6000, 630),
            new Vec2(7000, 630),
            new Vec2(7578, 270),
            new Vec2(10500, 630),
        ]

        this.birdSpriteKey = Level1.BIRD_SPRITE_KEY;
        this.birdPositions = [
            new Vec2(100, 300),
            new Vec2(1260, 172),
            new Vec2(3100, 350),
            new Vec2(4704, 141),
            new Vec2(5616, 480),
            new Vec2(7059, 285),
            new Vec2(9987, 228),
        ]

        this.levelxbound = 3840
        this.levelybound = 720
        // due to parallax of the background image, levelxbound does not equal viewport size
        // therefore, background image position and viewport bounds must be set differently
        this.backgroundImagePosition = new Vec2(this.levelxbound/2, this.levelybound/2);
        this.viewportBounds = new Vec2(this.levelxbound*3, this.levelybound+48)
    }

    public loadScene(): void {
        this.load.tilemap(this.tilemapKey, Level1.TILEMAP_PATH);
        this.load.spritesheet(this.playerSpriteKey, Level1.PLAYER_SPRITE_PATH);
        // this.load.audio(this.levelMusicKey, Level1.LEVEL_MUSIC_PATH);
        // this.load.audio(this.jumpAudioKey, Level1.JUMP_AUDIO_PATH);
        // this.load.audio(this.tileDestroyedAudioKey, Level1.TILE_DESTROYED_PATH);
        this.load.audio(Level1.DYING_AUDIO_KEY, Level1.DYING_AUDIO_PATH);
        this.load.image(Level1.LEVEL1_BACKGROUND_KEY, Level1.LEVEL1_BACKGROUND_PATH);
        this.load.image(Level1.KERNEL_SPRITE_KEY, Level1.KERNEL_SPRITE_PATH)
        this.load.image(Level1.POPCORN_SPRITE_KEY, Level1.POPCORN_SPRITE_PATH)

        this.load.spritesheet(Level1.RAT_SPRITE_KEY, Level1.RAT_SPRITE_PATH);
        this.load.spritesheet(Level1.BIRD_SPRITE_KEY, Level1.BIRD_SPRITE_PATH);
    }

    public unloadScene(): void {
        // By default, resouceManager unloads everything, so just keep what is same for all levels
        this.load.keepSpritesheet(this.playerSpriteKey);
        this.load.keepAudio(this.jumpAudioKey);
        this.load.keepAudio(this.dyingAudioKey);

    }

    public startScene(): void {
        super.startScene();
        this.nextLevel = MainMenu;
    }

    protected initializeViewport(): void {
        super.initializeViewport();
    }
}