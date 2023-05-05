import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import Level, { LevelLayers } from "./Level";
import RenderingManager from "../../Wolfie2D/Rendering/RenderingManager";
import SceneManager from "../../Wolfie2D/Scene/SceneManager";
import Viewport from "../../Wolfie2D/SceneGraph/Viewport";
import MainMenu from "./MainMenu";


export default class Level1 extends Level {

    public static readonly PLAYER_SPRITE_KEY = "PLAYER_SPRITE_KEY";
    public static readonly PLAYER_SPRITE_PATH = "game_assets/spritesheets/rob_the_cob.json";

    public static readonly TILEMAP_KEY = "LEVEL1";
    public static readonly TILEMAP_PATH = "game_assets/tilemaps/Level_1/level1_map.json";
    public static readonly WALLS_LAYER_KEY = "Main";
    public static readonly HAZARD_LAYER_KEY = "Hazard"

    public static readonly LEVEL1_BACKGROUND_KEY = "LEVEL1_BACKGROUND";
    public static readonly LEVEL1_BACKGROUND_PATH = "game_assets/images/level1_background.png";

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

    // Boss Content
    // public static readonly CHICKEN_SPRITE_KEY = "CHICKEN_SPRITE_KEY";
    // public static readonly CHICKEN_SPRITE_PATH = "game_assets/spritesheets/chicken.json";

    // public static readonly DOG_SPRITE_KEY = "DOG_SPRITE_KEY";
    // public static readonly DOG_SPRITE_PATH = "game_assets/spritesheets/dog.json";

    // public static readonly BOSS_MUSIC_KEY = "BOSS_MUSIC";
    // public static readonly BOSS_MUSIC_PATH = "game_assets/music/BGM/BossBGM.mp3";

    // public static readonly CHICKEN_DYING_AUDIO_KEY = "CHICKEN_DYING_AUDIO";
    // public static readonly CHICKEN_DYING_AUDIO_PATH = "game_assets/sounds/Chicken/Chicken_Dying.wav";

    // public static readonly CHICKEN_EGG_AUDIO_KEY = "CHICKEN_GG_AUDIO";
    // public static readonly CHICKEN_EGG_AUDIO_PATH = "game_assets/sounds/Chicken/Chicken_Egg.wav";

    // public static readonly CHICKEN_WALK_AUDIO_KEY = "CHICKEN_WALK_AUDIO";
    // public static readonly CHICKEN_WALK_AUDIO_PATH = "game_assets/sounds/Chicken/Chicken_Walk.wav";

    // public static readonly DOG_DYING_AUDIO_KEY = "DOG_DYING_AUDIO";
    // public static readonly DOG_DYING_AUDIO_PATH = "game_assets/sounds/Dog/Dog_Dying.wav";

    // public static readonly DOG_WALK_AUDIO_KEY = "DOG_WALK_AUDIO";
    // public static readonly DOG_WALK_AUDIO_PATH = "game_assets/sounds/Dog/Dog_Walk.wav";

    // public static readonly DOG_BITE_AUDIO_KEY = "DOG_BITE_AUDIO";
    // public static readonly DOG_BITE_AUDIO_PATH = "game_assets/sounds/Dog/Dog_Bite.wav";

    public constructor(viewport: Viewport, sceneManager: SceneManager, renderingManager: RenderingManager, options: Record<string, any>) {
        super(viewport, sceneManager, renderingManager, options);
        
        this.tilemapKey = Level1.TILEMAP_KEY;
        this.tilemapScale = new Vec2(3, 3);
        this.wallsLayerKey = Level1.WALLS_LAYER_KEY;
        this.hazardsLayerKey = Level1.HAZARD_LAYER_KEY;

        this.playerSpriteKey = Level1.PLAYER_SPRITE_KEY;
        this.playerSpawn = new Vec2(100, 570);

        this.backgroundKey = Level1.LEVEL1_BACKGROUND_KEY;

        // Audio
        this.levelMusicKey = Level1.LEVEL_MUSIC_KEY;
        this.playerDamageAudioKey = Level1.PLAYER_DAMAGE_AUDIO_KEY;
        this.playerDeathAudioKey = Level1.PLAYER_DEATH_AUDIO_KEY;
        this.playerGrappleAudioKey = Level1.PLAYER_GRAPPLE_AUDIO_KEY;
        this.playerJumpAudioKey = Level1.PLAYER_JUMP_AUDIO_KEY;
        this.playerRifleAudioKey = Level1.PLAYER_Rifle_AUDIO_KEY;
        this.playerShotgunAudioKey = Level1.PLAYER_SHOTGUN_AUDIO_KEY;
        this.playerWalkAudioKey = Level1.PLAYER_WALK_AUDIO_KEY;
        this.HitAudioKey = Level1.HIT_AUDIO_KEY;
        this.mobDyingAudioKey = Level1.MOB_DEATH_AUDIO_KEY;

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
            new Vec2(5950, 290),
            new Vec2(6960, 290)
        ]
        this.birdSpriteKey = Level1.BIRD_SPRITE_KEY;
        this.birdPositions = [
            new Vec2(100, 300),
            new Vec2(1260, 172),
            new Vec2(3100, 350),
            new Vec2(4704, 141),
            new Vec2(5616, 480),
            new Vec2(7059, 285),
            new Vec2(5950, 290),
        ]

        // map length in tiles * tile dimension in pixels * tilemap scale
        // 240 * 16 * 3 = 11520
        this.levelxbound = 11520
        // 16 * 16 * 3 = 768
        this.levelybound = 768
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
        this.levelEndPosition = new Vec2(11328, this.levelybound/2)//Vec2(11328, 528)
        this.levelEndHalfSize = new Vec2(96, this.levelybound)//Vec2(96, 96)

        // check to show labels or not
        this.isLevel1 = true;
        this.isLevel2 = false;


        // Boss Content
        // this.bossMusicKey = Level1.BOSS_MUSIC_KEY;
        // this.chickenDyingAudioKey = Level1.CHICKEN_DYING_AUDIO_KEY;
        // this.chickenEggAudioKey = Level1.CHICKEN_EGG_AUDIO_KEY;
        // this.chickenWalkAudioKey = Level1.CHICKEN_WALK_AUDIO_KEY;
        // this.dogDyingAudioKey = Level1.DOG_DYING_AUDIO_KEY;
        // this.dogWalkAudioKey = Level1.DOG_WALK_AUDIO_KEY;
        // this.dogBiteAudioKey = Level1.DOG_BITE_AUDIO_KEY;
        // this.chickenSpriteKey = Level1.CHICKEN_SPRITE_KEY;
        // this.chickenPosition = new Vec2(10938, 560),
        // this.bossViewport = [10008, 10558, 768]

        // this.dogSpiteKey = Level1.DOG_SPRITE_KEY;
        // this.dogPosition = new Vec2(10906, 360)
        // this.bossViewport = [10008, 10558, 768]
    }

    public loadScene(): void {
        this.load.tilemap(this.tilemapKey, Level1.TILEMAP_PATH);
        this.load.spritesheet(this.playerSpriteKey, Level1.PLAYER_SPRITE_PATH);

        this.load.image(Level1.LEVEL1_BACKGROUND_KEY, Level1.LEVEL1_BACKGROUND_PATH);
        this.load.image(Level1.KERNEL_SPRITE_KEY, Level1.KERNEL_SPRITE_PATH)
        this.load.image(Level1.POPCORN_SPRITE_KEY, Level1.POPCORN_SPRITE_PATH)

        this.load.spritesheet(Level1.RAT_SPRITE_KEY, Level1.RAT_SPRITE_PATH);
        this.load.spritesheet(Level1.BIRD_SPRITE_KEY, Level1.BIRD_SPRITE_PATH);

        // loads Audio
        this.load.audio(this.levelMusicKey, Level1.LEVEL_MUSIC_PATH);
        this.load.audio(this.playerDamageAudioKey, Level1.PLAYER_DAMAGE_AUDIO_PATH);
        this.load.audio(this.playerDeathAudioKey, Level1.PLAYER_DEATH_AUDIO_PATH);
        this.load.audio(this.playerGrappleAudioKey, Level1.PLAYER_GRAPPLE_AUDIO_PATH);
        this.load.audio(this.playerJumpAudioKey, Level1.PLAYER_JUMP_AUDIO_PATH);
        this.load.audio(this.playerRifleAudioKey, Level1.PLAYER_Rifle_AUDIO_PATH);
        this.load.audio(this.playerShotgunAudioKey, Level1.PLAYER_SHOTGUN_AUDIO_PATH);
        this.load.audio(this.playerWalkAudioKey, Level1.PLAYER_WALK_AUDIO_PATH);

        this.load.audio(this.HitAudioKey, Level1.HIT_AUDIO_PATH);
        this.load.audio(this.mobDyingAudioKey, Level1.MOB_DEATH_AUDIO_PATH);

        // Boss Content
        // this.load.spritesheet(Level1.CHICKEN_SPRITE_KEY, Level1.CHICKEN_SPRITE_PATH);
        // this.load.spritesheet(Level1.DOG_SPRITE_KEY, Level1.DOG_SPRITE_PATH);
        // this.load.audio(this.bossMusicKey, Level1.BOSS_MUSIC_PATH)

        // this.load.audio(this.chickenDyingAudioKey, Level1.CHICKEN_DYING_AUDIO_PATH);
        // this.load.audio(this.chickenEggAudioKey, Level1.CHICKEN_EGG_AUDIO_PATH);
        // this.load.audio(this.chickenWalkAudioKey, Level1.CHICKEN_WALK_AUDIO_PATH);

        // this.load.audio(this.dogBiteAudioKey, Level1.DOG_BITE_AUDIO_PATH);
        // this.load.audio(this.dogDyingAudioKey, Level1.DOG_DYING_AUDIO_PATH);
        // this.load.audio(this.dogWalkAudioKey, Level1.DOG_WALK_AUDIO_PATH);
    }

    public unloadScene(): void {
        // By default, resouceManager unloads everything, so just keep what is same for all levels
        this.load.keepAudio(this.levelMusicKey);
        this.load.keepAudio(this.playerDamageAudioKey);
        this.load.keepAudio(this.playerDeathAudioKey);
        this.load.keepAudio(this.playerGrappleAudioKey);
        this.load.keepAudio(this.playerJumpAudioKey);
        this.load.keepAudio(this.playerRifleAudioKey);
        this.load.keepAudio(this.playerShotgunAudioKey);
        this.load.keepAudio(this.playerWalkAudioKey);
        this.load.keepAudio(this.HitAudioKey);
    }

    public startScene(): void {
        super.startScene();
        this.nextLevel = MainMenu;
    }

    protected initializeViewport(): void {
        super.initializeViewport();
    }
}