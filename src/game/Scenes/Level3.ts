import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import RenderingManager from "../../Wolfie2D/Rendering/RenderingManager";
import SceneManager from "../../Wolfie2D/Scene/SceneManager";
import Viewport from "../../Wolfie2D/SceneGraph/Viewport";
import Level from "./Level";
import MainMenu from "./MainMenu";

export default class Level3 extends Level {
    public static readonly PLAYER_SPRITE_KEY = "PLAYER_SPRITE_KEY";
    public static readonly PLAYER_SPRITE_PATH = "game_assets/spritesheets/rob_the_cob.json";

    public static readonly TILEMAP_KEY = "LEVEL3";
    public static readonly TILEMAP_PATH = "game_assets/tilemaps/level3_map.json";
    public static readonly WALLS_LAYER_KEY = "Main";

    public static readonly LEVEL3_BACKGROUND_KEY = "LEVEL3_BACKGROUND";
    public static readonly LEVEL3_BACKGROUND_PATH = "game_assets/images/level3_background.png";

    // Sprites
    public static readonly KERNEL_SPRITE_KEY = "KERNEL_SPRITE_KEY";
    public static readonly KERNEL_SPRITE_PATH = "game_assets/sprites/kernel.png";

    public static readonly POPCORN_SPRITE_KEY = "POPCORN_SPRITE_KEY";
    public static readonly POPCORN_SPRITE_PATH = "game_assets/sprites/popcorn.png";

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

    // Boss Content
    public static readonly CHICKEN_SPRITE_KEY = "CHICKEN_SPRITE_KEY";
    public static readonly CHICKEN_SPRITE_PATH = "game_assets/spritesheets/chicken.json";

    public static readonly BOSS_MUSIC_KEY = "BOSS_MUSIC";
    public static readonly BOSS_MUSIC_PATH = "game_assets/music/BGM/BossBGM.mp3";

    public static readonly CHICKEN_DYING_AUDIO_KEY = "CHICKEN_DYING_AUDIO";
    public static readonly CHICKEN_DYING_AUDIO_PATH = "game_assets/sounds/Chicken/Chicken_Dying.wav";

    public static readonly CHICKEN_EGG_AUDIO_KEY = "CHICKEN_EGG_AUDIO";
    public static readonly CHICKEN_EGG_AUDIO_PATH = "game_assets/sounds/Chicken/Chicken_Egg.wav";

    public static readonly CHICKEN_WALK_AUDIO_KEY = "CHICKEN_WALK_AUDIO";
    public static readonly CHICKEN_WALK_AUDIO_PATH = "game_assets/sounds/Chicken/Chicken_Walk.wav";

    public constructor(viewport: Viewport, sceneManager: SceneManager, renderingManager: RenderingManager, options: Record<string, any>) {
        super(viewport, sceneManager, renderingManager, options)

        this.tilemapKey = Level3.TILEMAP_KEY;
        this.tilemapScale = new Vec2(3, 3);
        this.wallsLayerKey = Level3.WALLS_LAYER_KEY;

        this.playerSpriteKey = Level3.PLAYER_SPRITE_KEY;
        this.playerSpawn = new Vec2(100, 570);

        this.backgroundKey = Level3.LEVEL3_BACKGROUND_KEY

        // Audio
        this.levelMusicKey = Level3.LEVEL_MUSIC_KEY;
        this.playerDamageAudioKey = Level3.PLAYER_DAMAGE_AUDIO_KEY;
        this.playerDeathAudioKey = Level3.PLAYER_DEATH_AUDIO_KEY;
        this.playerGrappleAudioKey = Level3.PLAYER_GRAPPLE_AUDIO_KEY;
        this.playerJumpAudioKey = Level3.PLAYER_JUMP_AUDIO_KEY;
        this.playerRifleAudioKey = Level3.PLAYER_Rifle_AUDIO_KEY;
        this.playerShotgunAudioKey = Level3.PLAYER_SHOTGUN_AUDIO_KEY;
        this.playerWalkAudioKey = Level3.PLAYER_WALK_AUDIO_KEY;
        this.HitAudioKey = Level3.HIT_AUDIO_KEY;

        this.kernelSpriteKey = Level3.KERNEL_SPRITE_KEY;
        this.popcornSpriteKey = Level3.POPCORN_SPRITE_KEY;

        this.levelxbound = 2880
        this.levelybound = 768

        this.backgroundImagePosition = new Vec2(this.levelxbound/2, this.levelybound/2);
        this.viewportBounds = new Vec2(this.levelxbound, this.levelybound)

        this.parallaxBackground = false;

        // Level End
        this.levelEndPosition = new Vec2(2808, 432)
        this.levelEndHalfSize = new Vec2(144, this.levelybound)

        // check to show labels or not
        this.isLevel1 = false;
        this.isLevel2 = false;

         // Boss Content
        this.bossMusicKey = Level3.BOSS_MUSIC_KEY;
        this.chickenDyingAudioKey = Level3.CHICKEN_DYING_AUDIO_KEY;
        this.chickenEggAudioKey = Level3.CHICKEN_EGG_AUDIO_KEY;
        this.chickenWalkAudioKey = Level3.CHICKEN_WALK_AUDIO_KEY;

        this.chickenSpriteKey = Level3.CHICKEN_SPRITE_KEY;
        this.chickenPosition = new Vec2(2256, 560),
        this.bossViewport = [912, 1872, 768]
        
    }

    public loadScene(): void {
        this.load.tilemap(this.tilemapKey, Level3.TILEMAP_PATH);
        this.load.spritesheet(this.playerSpriteKey, Level3.PLAYER_SPRITE_PATH);

        this.load.image(Level3.LEVEL3_BACKGROUND_KEY, Level3.LEVEL3_BACKGROUND_PATH)
        this.load.image(Level3.KERNEL_SPRITE_KEY, Level3.KERNEL_SPRITE_PATH)
        this.load.image(Level3.POPCORN_SPRITE_KEY, Level3.POPCORN_SPRITE_PATH)

        // loads Audio
        this.load.audio(this.levelMusicKey, Level3.LEVEL_MUSIC_PATH);
        this.load.audio(this.playerDamageAudioKey, Level3.PLAYER_DAMAGE_AUDIO_PATH);
        this.load.audio(this.playerDeathAudioKey, Level3.PLAYER_DEATH_AUDIO_PATH);
        this.load.audio(this.playerGrappleAudioKey, Level3.PLAYER_GRAPPLE_AUDIO_PATH);
        this.load.audio(this.playerJumpAudioKey, Level3.PLAYER_JUMP_AUDIO_PATH);
        this.load.audio(this.playerRifleAudioKey, Level3.PLAYER_Rifle_AUDIO_PATH);
        this.load.audio(this.playerShotgunAudioKey, Level3.PLAYER_SHOTGUN_AUDIO_PATH);
        this.load.audio(this.playerWalkAudioKey, Level3.PLAYER_WALK_AUDIO_PATH);

        this.load.audio(this.HitAudioKey, Level3.HIT_AUDIO_PATH);

         // Boss Content
        this.load.spritesheet(Level3.CHICKEN_SPRITE_KEY, Level3.CHICKEN_SPRITE_PATH);
        this.load.audio(this.bossMusicKey, Level3.BOSS_MUSIC_PATH)
        this.load.audio(this.chickenDyingAudioKey, Level3.CHICKEN_DYING_AUDIO_PATH);
        this.load.audio(this.chickenEggAudioKey, Level3.CHICKEN_EGG_AUDIO_PATH);
        this.load.audio(this.chickenWalkAudioKey, Level3.CHICKEN_WALK_AUDIO_PATH);

    }

    public unloadScene(): void {

    }
    
    public startScene(): void {
        super.startScene();
        this.nextLevel = MainMenu;
    }

    protected initializeViewport(): void {
        super.initializeViewport();
    }
 

}
    