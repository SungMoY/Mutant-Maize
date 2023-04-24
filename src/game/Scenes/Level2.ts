import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import Level from "./Level";
import MainMenu from "./MainMenu";

import Viewport from "../../Wolfie2D/SceneGraph/Viewport";
import RenderingManager from "../../Wolfie2D/Rendering/RenderingManager";
import SceneManager from "../../Wolfie2D/Scene/SceneManager";

export default class Level2 extends Level {

    public static readonly PLAYER_SPRITE_KEY = "PLAYER_SPRITE_KEY";
    public static readonly PLAYER_SPRITE_PATH = "game_assets/spritesheets/rob_the_cob.json";

    public static readonly TILEMAP_KEY = "LEVEL2";
    public static readonly TILEMAP_PATH = "game_assets/tilemaps/Level_2/level2_map.json";
    public static readonly WALLS_LAYER_KEY = "Main";

    public static readonly LEVEL_MUSIC_KEY = "LEVEL_MUSIC";
    public static readonly LEVEL_MUSIC_PATH = "game_assets/music/level2music.mp3";

    public static readonly JUMP_AUDIO_KEY = "PLAYER_JUMP";
    public static readonly JUMP_AUDIO_PATH = "game_assets/sounds/jump.wav";
    
    public static readonly DYING_AUDIO_KEY = "DYING_AUDIO";
    public static readonly DYING_AUDIO_PATH = "game_assets/music/dying.mp3";

    public static readonly LEVEL2_BACKGROUND_KEY = "LEVEL2_BACKGROUND";
    public static readonly LEVEL2_BACKGROUND_PATH = "game_assets/images/level2_background.png";

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

        this.tilemapKey = Level2.TILEMAP_KEY;
        this.tilemapScale = new Vec2(3, 3);
        this.wallsLayerKey = Level2.WALLS_LAYER_KEY;

        this.playerSpriteKey = Level2.PLAYER_SPRITE_KEY;
        this.playerSpawn = new Vec2(220, 5000);

        this.levelMusicKey = Level2.LEVEL_MUSIC_KEY
        this.jumpAudioKey = Level2.JUMP_AUDIO_KEY;
        this.dyingAudioKey = Level2.DYING_AUDIO_KEY;
        this.backgroundKey = Level2.LEVEL2_BACKGROUND_KEY;

        this.levelEndPosition = new Vec2(0, 0).mult(this.tilemapScale);
        this.levelEndHalfSize = new Vec2(32, 32).mult(this.tilemapScale);

        this.kernelSpriteKey = Level2.KERNEL_SPRITE_KEY;
        this.popcornSpriteKey = Level2.POPCORN_SPRITE_KEY;

        this.ratSpriteKey = Level2.RAT_SPRITE_KEY;
        this.ratPositions = [

        ]

        this.birdSpriteKey = Level2.BIRD_SPRITE_KEY;
        this.birdPositions = [

        ]
        // map length in tiles * tile dimension in pixels * tilemap scale
        // 120 * 16 * 3
        this.levelxbound = 1536
        // 32 * 16 * 3
        this.levelybound = 5760
        this.backgroundImagePosition = new Vec2(this.levelxbound/2, this.levelybound/2);
        this.viewportBounds = new Vec2(this.levelxbound, this.levelybound)


    }
    /**
     * Load in resources for level 2.
     */
    public loadScene(): void {
        this.load.tilemap(this.tilemapKey, Level2.TILEMAP_PATH);
        this.load.spritesheet(this.playerSpriteKey, Level2.PLAYER_SPRITE_PATH);
        // this.load.audio(this.levelMusicKey, Level1.LEVEL_MUSIC_PATH);
        // this.load.audio(this.jumpAudioKey, Level1.JUMP_AUDIO_PATH);
        // this.load.audio(this.tileDestroyedAudioKey, Level1.TILE_DESTROYED_PATH);
        this.load.audio(Level2.DYING_AUDIO_KEY, Level2.DYING_AUDIO_PATH);
        this.load.image(Level2.LEVEL2_BACKGROUND_KEY, Level2.LEVEL2_BACKGROUND_PATH);
        this.load.image(Level2.KERNEL_SPRITE_KEY, Level2.KERNEL_SPRITE_PATH)
        this.load.image(Level2.POPCORN_SPRITE_KEY, Level2.POPCORN_SPRITE_PATH)

        this.load.spritesheet(Level2.RAT_SPRITE_KEY, Level2.RAT_SPRITE_PATH);
        this.load.spritesheet(Level2.BIRD_SPRITE_KEY, Level2.BIRD_SPRITE_PATH);
    }

    public unloadScene(): void {
        // TODO decide which resources to keep/cull 
        // This can left blank as level 2 is the last level.
        // Resource manager by default culls everything
    }

    public startScene(): void {
        super.startScene();
        this.nextLevel = MainMenu;
    }

    protected initializeViewport(): void {
        super.initializeViewport();
    }
}