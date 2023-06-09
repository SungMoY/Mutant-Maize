import AABB from "../../Wolfie2D/DataTypes/Shapes/AABB";
import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import Level from "./Level";
import RenderingManager from "../../Wolfie2D/Rendering/RenderingManager";
import SceneManager from "../../Wolfie2D/Scene/SceneManager";
import Viewport from "../../Wolfie2D/SceneGraph/Viewport";

import MainMenu from "./MainMenu";

/**
 * The first level for HW4 - should be the one with the grass and the clouds.
 */
export default class Level1 extends Level {

    public static readonly PLAYER_SPAWN = new Vec2(150, 500);
    //public static readonly PLAYER_SPAWN = new Vec2(11000, 576);
    public static readonly PLAYER_SPRITE_KEY = "PLAYER_SPRITE_KEY";
    //public static readonly PLAYER_SPRITE_PATH = "game_assets/spritesheets/UFO_alien.json";
    public static readonly PLAYER_SPRITE_PATH = "game_assets/spritesheets/rob_the_cob.json";

    public static readonly TILEMAP_KEY = "LEVEL1";
    public static readonly TILEMAP_PATH = "game_assets/tilemaps/level1_map.json";
    // this scale makes the tilesets more visually appealing on the browser
    public static readonly TILEMAP_SCALE = new Vec2(3, 3);
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

    public constructor(viewport: Viewport, sceneManager: SceneManager, renderingManager: RenderingManager, options: Record<string, any>) {
        super(viewport, sceneManager, renderingManager, options);
        this.tilemapKey = Level1.TILEMAP_KEY;
        this.tilemapScale = Level1.TILEMAP_SCALE;
        this.wallsLayerKey = Level1.WALLS_LAYER_KEY;
        this.playerSpriteKey = Level1.PLAYER_SPRITE_KEY;
        this.playerSpawn = Level1.PLAYER_SPAWN;
        // this.levelMusicKey = Level1.LEVEL_MUSIC_KEY
        this.jumpAudioKey = Level1.JUMP_AUDIO_KEY;
        this.dyingAudioKey = Level1.DYING_AUDIO_KEY;
        this.backgroundKey = Level1.LEVEL1_BACKGROUND_KEY;
        this.levelEndPosition = new Vec2(11232, 528)
        this.levelEndHalfSize = new Vec2(96, 96)
        this.kernelSpriteKey = Level1.KERNEL_SPRITE_KEY;
        this.popcornSpriteKey = Level1.POPCORN_SPRITE_KEY;
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