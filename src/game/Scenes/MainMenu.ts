import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import { GameEventType } from "../../Wolfie2D/Events/GameEventType";
import Button from "../../Wolfie2D/Nodes/UIElements/Button";
import { UIElementType } from "../../Wolfie2D/Nodes/UIElements/UIElementTypes";
import Scene from "../../Wolfie2D/Scene/Scene";
import Color from "../../Wolfie2D/Utils/Color";

import Level1 from "./Level1";
import ControlsScreen from "./ControlsScreen";
import AboutScreen from "./AboutScreen";
import CreditsScreen from "./CreditsScreen";
import HelpScreen from "./HelpScreen";
import LevelSelectScreen from "./LevelSelectScreen";


// Layers for the main menu scene
export const MenuLayers = {
    MAIN: "MAIN"
} as const;

export default class MainMenu extends Scene {

    public static readonly MUSIC_KEY = "MAIN_MENU_MUSIC";
    public static readonly MUSIC_PATH = "hw4_assets/music/menu.mp3";

    public loadScene(): void {
        // Load the menu song
        this.load.audio(MainMenu.MUSIC_KEY, MainMenu.MUSIC_PATH);
    }

    public startScene(): void {
        this.addUILayer(MenuLayers.MAIN);

        // Center the viewport
        let size = this.viewport.getHalfSize();
        this.viewport.setFocus(size);
        this.viewport.setZoomLevel(1);

        let MenuPanel = [
            {text: "PLAY", goTo: Level1},
            {text: "CONTROLS", goTo: ControlsScreen},
            {text: "ABOUT", goTo: AboutScreen},
            {text: "CREDITS", goTo: CreditsScreen},
            {text: "HELP", goTo: HelpScreen},
            {text: "LEVELS", goTo: LevelSelectScreen}
        
        ]

        for (let i = 0; i < MenuPanel.length; i++) {
            let button = <Button>this.add.uiElement(UIElementType.BUTTON, MenuLayers.MAIN, {position: new Vec2(size.x, size.y + (i * 50)), text: MenuPanel[i].text});
            button.backgroundColor = Color.TRANSPARENT;
            button.borderColor = Color.WHITE;
            button.borderRadius = 0;
            button.setPadding(new Vec2(50, 10));
            button.font = "PixelSimple";
            button.onClick = () => {
                console.log("BUTTON TEXT: " + MenuPanel[i].text)
                if (MenuPanel[i].text == "PLAY") {
                    this.emitter.fireEvent(GameEventType.STOP_SOUND, {key: MainMenu.MUSIC_KEY, holdReference: false});
                }
                this.sceneManager.changeToScene(MenuPanel[i].goTo);
            }
        }

        this.emitter.fireEvent(GameEventType.PLAY_MUSIC, {key: MainMenu.MUSIC_KEY, loop: true, holdReference: true})

    }

    public unloadScene(): void {
    }
}

