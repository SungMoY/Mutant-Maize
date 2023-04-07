import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import { GameEventType } from "../../Wolfie2D/Events/GameEventType";
import Button from "../../Wolfie2D/Nodes/UIElements/Button";
import { UIElementType } from "../../Wolfie2D/Nodes/UIElements/UIElementTypes";
import Scene from "../../Wolfie2D/Scene/Scene";
import Color from "../../Wolfie2D/Utils/Color";
import MainMenu from "./MainMenu";

// Layers for the main menu scene
export const MenuLayers = {
    MAIN: "MAIN"
} as const;

export default class SplashScreen extends Scene {

    public static readonly MUSIC_KEY = "MAIN_MENU_MUSIC";
    public static readonly MUSIC_PATH = "game_assets/music/menu.mp3";

    public loadScene(): void {
        // Load the menu song
        this.load.audio(SplashScreen.MUSIC_KEY, SplashScreen.MUSIC_PATH);
    }

    public startScene(): void {
        this.addUILayer(MenuLayers.MAIN);

        // play music
        /*
        * the browser prevents audio from being played on a page until the user has interacted with it
        * to get around this, the splash screen "plays" the music but is heard only when the user goes to the main menu
        * it makes no sense why this works the way it does, but it's fine this way
        **/
        // this.emitter.fireEvent(GameEventType.PLAY_MUSIC, {key: SplashScreen.MUSIC_KEY, loop: true, holdReference: true});

        // Center the viewport
        let size = this.viewport.getHalfSize();
        this.viewport.setFocus(size);
        this.viewport.setZoomLevel(1);

        // Create a play button
        let playBtn = <Button>this.add.uiElement(UIElementType.BUTTON, MenuLayers.MAIN, {position: new Vec2(size.x, size.y), text: "CLICK TO START"});
        playBtn.backgroundColor = Color.TRANSPARENT;
        playBtn.borderColor = Color.WHITE;
        playBtn.borderRadius = 0;
        playBtn.setPadding(new Vec2(50, 10));
        playBtn.font = "PixelSimple";

        // When the play button is clicked, go to the next scene
        playBtn.onClick = () => {
            this.sceneManager.changeToScene(MainMenu);
        }

    }

    public unloadScene(): void {
        // Leaving this scene means the user is going to MainMenu, so start playing

    }
}

