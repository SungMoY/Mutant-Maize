import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import Level from "./Level";
import MainMenu from "./MainMenu";
import Viewport from "../../Wolfie2D/SceneGraph/Viewport";
import RenderingManager from "../../Wolfie2D/Rendering/RenderingManager";
import SceneManager from "../../Wolfie2D/Scene/SceneManager";
import Level6 from "./Level6";

export default class Level5 extends Level {

    public static readonly PLAYER_SPRITE_KEY = "PLAYER_SPRITE_KEY";
    public static readonly PLAYER_SPRITE_PATH = "game_assets/spritesheets/rob_the_cob.json";

    public static readonly TILEMAP_KEY = "LEVEL5";
    public static readonly TILEMAP_PATH = "game_assets/tilemaps/level5_map.json";
    public static readonly WALLS_LAYER_KEY = "Main";
    public static readonly HAZARD_LAYER_KEY = "Hazard"

    public static readonly LEVEL2_BACKGROUND_KEY = "LEVEL2_BACKGROUND";
    public static readonly LEVEL2_BACKGROUND_PATH = "game_assets/images/level5_background.png";

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
    public static readonly LEVEL_MUSIC_PATH = "game_assets/music/BGM/level5_music.mp3";

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

        this.tilemapKey = Level5.TILEMAP_KEY;
        this.tilemapScale = new Vec2(3, 3);
        this.wallsLayerKey = Level5.WALLS_LAYER_KEY;
        this.hazardsLayerKey = Level5.HAZARD_LAYER_KEY;

        this.playerSpriteKey = Level5.PLAYER_SPRITE_KEY;
        this.playerSpawn = new Vec2(220, 5550);

        this.backgroundKey = Level5.LEVEL2_BACKGROUND_KEY;

        // Audio
        this.levelMusicKey = Level5.LEVEL_MUSIC_KEY
        this.playerDamageAudioKey = Level5.PLAYER_DAMAGE_AUDIO_KEY;
        this.playerDeathAudioKey = Level5.PLAYER_DEATH_AUDIO_KEY;
        this.playerGrappleAudioKey = Level5.PLAYER_GRAPPLE_AUDIO_KEY;
        this.playerJumpAudioKey = Level5.PLAYER_JUMP_AUDIO_KEY;
        this.playerRifleAudioKey = Level5.PLAYER_Rifle_AUDIO_KEY;
        this.playerShotgunAudioKey = Level5.PLAYER_SHOTGUN_AUDIO_KEY;
        this.playerWalkAudioKey = Level5.PLAYER_WALK_AUDIO_KEY;
        this.HitAudioKey = Level5.HIT_AUDIO_KEY;
        this.mobDyingAudioKey = Level5.MOB_DEATH_AUDIO_KEY;

        this.kernelSpriteKey = Level5.KERNEL_SPRITE_KEY;
        this.popcornSpriteKey = Level5.POPCORN_SPRITE_KEY;

        this.ratSpriteKey = Level5.RAT_SPRITE_KEY;
        this.ratPositions = [
            new Vec2(1344, 5376),
            new Vec2(192,  4896),
            new Vec2(1344, 4704),
            new Vec2(1152, 3840),
            //new Vec2(768, 3024),
            new Vec2(1008, 3024),
            new Vec2(480, 2016),
            new Vec2(133, 1344),
            new Vec2(384, 1008),
            new Vec2(96, 768)
        ]
        this.birdSpriteKey = Level5.BIRD_SPRITE_KEY;
        this.birdPositions = [
            new Vec2(1056, 5136),
            new Vec2(480, 4896),
            new Vec2(960, 4704),
            new Vec2(960, 4272),
            new Vec2(480, 3984),
            new Vec2(768, 3264),
            new Vec2(1248, 2640),
            new Vec2(1056, 1872),
            new Vec2(768, 1488),
            new Vec2(768, 480)
        ]
        // map length in tiles * tile dimension in pixels * tilemap scale
        // 120 * 16 * 3
        this.levelxbound = 1536
        // 32 * 16 * 3
        this.levelybound = 5760
        // direct center pixel of entire viewport level
        this.backgroundImagePosition = new Vec2(this.levelxbound/2, this.levelybound/2);
        this.viewportBounds = new Vec2(this.levelxbound, this.levelybound)

        this.parallaxBackground = false;

        // Level End
        this.levelEndPosition = new Vec2(this.levelxbound/2, 144)
        this.levelEndHalfSize = new Vec2(this.levelxbound/4, 288)

        // check to show labels or not
        this.isLevel2 = false;
        this.isLevel2 = true;

    }
    /**
     * Load in resources for level 2.
     */
    public loadScene(): void {
        this.load.tilemap(this.tilemapKey, Level5.TILEMAP_PATH);
        this.load.spritesheet(this.playerSpriteKey, Level5.PLAYER_SPRITE_PATH);

        this.load.image(Level5.LEVEL2_BACKGROUND_KEY, Level5.LEVEL2_BACKGROUND_PATH);
        this.load.image(Level5.KERNEL_SPRITE_KEY, Level5.KERNEL_SPRITE_PATH)
        this.load.image(Level5.POPCORN_SPRITE_KEY, Level5.POPCORN_SPRITE_PATH)

        this.load.spritesheet(Level5.RAT_SPRITE_KEY, Level5.RAT_SPRITE_PATH);
        this.load.spritesheet(Level5.BIRD_SPRITE_KEY, Level5.BIRD_SPRITE_PATH);

        // loads Audio
        this.load.audio(this.levelMusicKey, Level5.LEVEL_MUSIC_PATH);
        this.load.audio(this.playerDamageAudioKey, Level5.PLAYER_DAMAGE_AUDIO_PATH);
        this.load.audio(this.playerDeathAudioKey, Level5.PLAYER_DEATH_AUDIO_PATH);
        this.load.audio(this.playerGrappleAudioKey, Level5.PLAYER_GRAPPLE_AUDIO_PATH);
        this.load.audio(this.playerJumpAudioKey, Level5.PLAYER_JUMP_AUDIO_PATH);
        this.load.audio(this.playerRifleAudioKey, Level5.PLAYER_Rifle_AUDIO_PATH);
        this.load.audio(this.playerShotgunAudioKey, Level5.PLAYER_SHOTGUN_AUDIO_PATH);
        this.load.audio(this.playerWalkAudioKey, Level5.PLAYER_WALK_AUDIO_PATH);

        this.load.audio(this.HitAudioKey, Level5.HIT_AUDIO_PATH);
        this.load.audio(this.mobDyingAudioKey, Level5.MOB_DEATH_AUDIO_PATH);
    }

    public unloadScene(): void {
        // Resource manager by default culls everything
    }

    public startScene(): void {
        super.startScene();
        this.nextLevel = Level6;
    }

    protected initializeViewport(): void {
        super.initializeViewport();
    }
}