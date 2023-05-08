import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import Level, { LevelLayers } from "./Level";
import RenderingManager from "../../Wolfie2D/Rendering/RenderingManager";
import SceneManager from "../../Wolfie2D/Scene/SceneManager";
import Viewport from "../../Wolfie2D/SceneGraph/Viewport";
import MainMenu from "./MainMenu";
import Level5 from "./Level5";


export default class Level4 extends Level {

    public static readonly PLAYER_SPRITE_KEY = "PLAYER_SPRITE_KEY";
    public static readonly PLAYER_SPRITE_PATH = "game_assets/spritesheets/rob_the_cob.json";

    public static readonly TILEMAP_KEY = "LEVEL4";
    public static readonly TILEMAP_PATH = "game_assets/tilemaps/level4_map.json";
    public static readonly WALLS_LAYER_KEY = "Main";
    public static readonly HAZARD_LAYER_KEY = "Hazard"

    public static readonly LEVEL1_BACKGROUND_KEY = "LEVEL4_BACKGROUND";
    public static readonly LEVEL1_BACKGROUND_PATH = "game_assets/images/level4_background.png";

    // Sprites
    public static readonly KERNEL_SPRITE_KEY = "KERNEL_SPRITE_KEY";
    public static readonly KERNEL_SPRITE_PATH = "game_assets/sprites/kernel.png";

    public static readonly POPCORN_SPRITE_KEY = "POPCORN_SPRITE_KEY";
    public static readonly POPCORN_SPRITE_PATH = "game_assets/sprites/popcorn.png";

    public static readonly RAT_SPRITE_KEY = "RAT_SPRITE_KEY";
    public static readonly RAT_SPRITE_PATH = "game_assets/spritesheets/rat.json";

    public static readonly BIRD_SPRITE_KEY = "BIRD_SPRITE_KEY";
    public static readonly BIRD_SPRITE_PATH = "game_assets/spritesheets/bird.json";

    // General Audio & Music
    public static readonly JUMP_AUDIO_KEY = "PLAYER_JUMP";
    public static readonly JUMP_AUDIO_PATH = "game_assets/sounds/jump.wav";

    public static readonly DYING_AUDIO_KEY = "DYING_AUDIO";
    public static readonly DYING_AUDIO_PATH = "game_assets/music/dying.mp3";
    
    public static readonly LEVEL_MUSIC_KEY = "LEVEL_MUSIC";
    public static readonly LEVEL_MUSIC_PATH = "game_assets/music/BGM/MainBGM.mp3";

    public static readonly HIT_AUDIO_KEY = "HIT";
    public static readonly HIT_AUDIO_PATH = "game_assets/sounds/General/Hit_Sound.wav";

    // Player Audio
    public static readonly PLAYER_DAMAGE_AUDIO_KEY = "PLAYER_DAMAGE";
    public static readonly PLAYER_DAMAGE_AUDIO_PATH = "game_assets/sounds/Player/Player_Damage.wav";

    public static readonly PLAYER_DEATH_AUDIO_KEY = "PLAYER_DEATH";
    public static readonly PLAYER_DEATH_AUDIO_PATH = "game_assets/sounds/Player/Player_Death.wav";

    public static readonly PLAYER_GRAPPLE_AUDIO_KEY = "PLAYER_GRAPPLE";
    public static readonly PLAYER_GRAPPLE_AUDIO_PATH = "game_assets/sounds/Player/Player_Grapple.wav";

    public static readonly PLAYER_JUMP_AUDIO_KEY = "PLAYER_JUMP";
    public static readonly PLAYER_JUMP_AUDIO_PATH = "game_assets/sounds/Player/Player_Jump.wav";

    public static readonly PLAYER_Rifle_AUDIO_KEY = "PLAYER_RIFLE";
    public static readonly PLAYER_Rifle_AUDIO_PATH = "game_assets/sounds/Player/Player_Rifle.wav";

    public static readonly PLAYER_SHOTGUN_AUDIO_KEY = "PLAYER_SHOTGUN";
    public static readonly PLAYER_SHOTGUN_AUDIO_PATH = "game_assets/sounds/Player/Player_Shotgun.wav";

    public static readonly PLAYER_WALK_AUDIO_KEY = "PLAYER_WALK";
    public static readonly PLAYER_WALK_AUDIO_PATH = "game_assets/sounds/Player/Player_Walk.wav";

    // Mob Audio
    public static readonly MOB_DEATH_AUDIO_KEY = "MOB_DEATH";
    public static readonly MOB_DEATH_AUDIO_PATH = "game_assets/sounds/General/Mob_Dying.wav";
    
    public constructor(viewport: Viewport, sceneManager: SceneManager, renderingManager: RenderingManager, options: Record<string, any>) {
        super(viewport, sceneManager, renderingManager, options);
        
        this.tilemapKey = Level4.TILEMAP_KEY;
        this.tilemapScale = new Vec2(3, 3);
        this.wallsLayerKey = Level4.WALLS_LAYER_KEY;
        this.hazardsLayerKey = Level4.HAZARD_LAYER_KEY;

        this.playerSpriteKey = Level4.PLAYER_SPRITE_KEY;
        this.playerSpawn = new Vec2(100, 570);

        this.backgroundKey = Level4.LEVEL1_BACKGROUND_KEY;

        // Audio
        this.levelMusicKey = Level4.LEVEL_MUSIC_KEY;
        this.playerDamageAudioKey = Level4.PLAYER_DAMAGE_AUDIO_KEY;
        this.playerDeathAudioKey = Level4.PLAYER_DEATH_AUDIO_KEY;
        this.playerGrappleAudioKey = Level4.PLAYER_GRAPPLE_AUDIO_KEY;
        this.playerJumpAudioKey = Level4.PLAYER_JUMP_AUDIO_KEY;
        this.playerRifleAudioKey = Level4.PLAYER_Rifle_AUDIO_KEY;
        this.playerShotgunAudioKey = Level4.PLAYER_SHOTGUN_AUDIO_KEY;
        this.playerWalkAudioKey = Level4.PLAYER_WALK_AUDIO_KEY;
        this.HitAudioKey = Level4.HIT_AUDIO_KEY;
        this.mobDyingAudioKey = Level4.MOB_DEATH_AUDIO_KEY;

        this.kernelSpriteKey = Level4.KERNEL_SPRITE_KEY;
        this.popcornSpriteKey = Level4.POPCORN_SPRITE_KEY;

        this.ratSpriteKey = Level4.RAT_SPRITE_KEY;
        this.ratPositions = [
            new Vec2(528, 816),
            new Vec2(2352, 768),
            new Vec2(3264, 864),
            new Vec2(4032, 768),
            new Vec2(4272, 624),
            new Vec2(4464, 816),
            new Vec2(4944, 864),
            new Vec2(5616, 864),
            new Vec2(6144, 864),
            new Vec2(6624, 864),
            new Vec2(7392, 816),
            new Vec2(7776, 816),
            new Vec2(8496, 816),
            new Vec2(9504, 528),
            new Vec2(9600, 816),
            new Vec2(10080, 816),
            new Vec2(10080, 528),
            new Vec2(11040, 816),

            new Vec2(144, 1392),
            new Vec2(1056, 1008),
            new Vec2(1440, 960),
            new Vec2(960, 1392),
            new Vec2(1440, 1392),
            new Vec2(1584, 1200),
            new Vec2(2400, 1392),
            new Vec2(2880, 1200),
            new Vec2(3360, 1392),
            new Vec2(3840, 1392),
            new Vec2(3840, 960),
            new Vec2(4320, 1104),
            new Vec2(4896, 1248),
            new Vec2(5664, 1104),
            new Vec2(6144, 1392),
            new Vec2(6480, 1440),
            new Vec2(6864, 1392),
            new Vec2(6960, 1104),
            new Vec2(6720, 960),
            new Vec2(8160, 960),
            new Vec2(8160, 1392),
            new Vec2(8880, 1392),
            new Vec2(9120, 960),
            new Vec2(9600, 960),
            new Vec2(10080, 960),
            new Vec2(10080, 1392)
        ]
        this.birdSpriteKey = Level4.BIRD_SPRITE_KEY;
        this.birdPositions = [
            new Vec2(576, 720),
            new Vec2(1440, 576),
            new Vec2(2400, 672),
            new Vec2(3312, 720),
            new Vec2(4416, 576),
            new Vec2(6432, 672),
            new Vec2(7536, 720),
            new Vec2(8592, 720),
            new Vec2(9504, 576),
            new Vec2(10368, 480),
            new Vec2(11040, 432)
        ]

        // map length in tiles * tile dimension in pixels * tilemap scale
        // 240 * 16 * 3 = 11520
        this.levelxbound = 11520
        // 32 * 16 * 3 = 1536
        this.levelybound = 1536
        // due to parallax of the background image, levelxbound does not equal viewport size
        // therefore, background image position and viewport bounds must be set differently
        // i think its length of image / 2
        // the background for level 1 is 3840 by 720
        // it is also map length in tiles * tile dimension in pixels to get total map pixel length
        // then divide that by 2 to get the pixel mid point of the map
        // 240 * 16 = 3840 / 2 = 1920
        // 16 * 16 = 720 / 2 = 360
        this.backgroundImagePosition = new Vec2(1920, 360);
        this.viewportBounds = new Vec2(this.levelxbound, this.levelybound)

        this.parallaxBackground = true;

        // Level End
        this.levelEndPosition = new Vec2(11424, this.levelybound/2)//Vec2(11328, 528)
        this.levelEndHalfSize = new Vec2(96, this.levelybound)//Vec2(96, 96)

        // check to show labels or not
        this.isLevel1 = false;
        this.isLevel2 = false;
    }

    public loadScene(): void {
        this.load.tilemap(this.tilemapKey, Level4.TILEMAP_PATH);
        this.load.spritesheet(this.playerSpriteKey, Level4.PLAYER_SPRITE_PATH);

        this.load.image(Level4.LEVEL1_BACKGROUND_KEY, Level4.LEVEL1_BACKGROUND_PATH);
        this.load.image(Level4.KERNEL_SPRITE_KEY, Level4.KERNEL_SPRITE_PATH)
        this.load.image(Level4.POPCORN_SPRITE_KEY, Level4.POPCORN_SPRITE_PATH)

        this.load.spritesheet(Level4.RAT_SPRITE_KEY, Level4.RAT_SPRITE_PATH);
        this.load.spritesheet(Level4.BIRD_SPRITE_KEY, Level4.BIRD_SPRITE_PATH);

        // loads Audio
        this.load.audio(this.levelMusicKey, Level4.LEVEL_MUSIC_PATH);
        this.load.audio(this.playerDamageAudioKey, Level4.PLAYER_DAMAGE_AUDIO_PATH);
        this.load.audio(this.playerDeathAudioKey, Level4.PLAYER_DEATH_AUDIO_PATH);
        this.load.audio(this.playerGrappleAudioKey, Level4.PLAYER_GRAPPLE_AUDIO_PATH);
        this.load.audio(this.playerJumpAudioKey, Level4.PLAYER_JUMP_AUDIO_PATH);
        this.load.audio(this.playerRifleAudioKey, Level4.PLAYER_Rifle_AUDIO_PATH);
        this.load.audio(this.playerShotgunAudioKey, Level4.PLAYER_SHOTGUN_AUDIO_PATH);
        this.load.audio(this.playerWalkAudioKey, Level4.PLAYER_WALK_AUDIO_PATH);

        this.load.audio(this.HitAudioKey, Level4.HIT_AUDIO_PATH);
        this.load.audio(this.mobDyingAudioKey, Level4.MOB_DEATH_AUDIO_PATH);

    }

    public unloadScene(): void {
        // Resource manager by default culls everything
    }

    public startScene(): void {
        super.startScene();
        this.nextLevel = Level5;
    }

    protected initializeViewport(): void {
        super.initializeViewport();
    }
}