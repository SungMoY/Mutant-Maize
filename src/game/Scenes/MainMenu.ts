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
import Label from "../../Wolfie2D/Nodes/UIElements/Label";

export default class MainMenu extends Scene {

    public static readonly MUSIC_KEY = "MAIN_MENU_MUSIC";
    public static readonly MUSIC_PATH = "game_assets/music/menu2.mp3";

    public static readonly BACKGROUND_KEY = "BACKGROUND";
    public static readonly BACKGROUND_PATH = "game_assets/images/background.png";

    public static readonly LOGO_KEY = "LOGO";
    public static readonly LOGO_PATH = "game_assets/images/logo.png";

    public loadScene(): void {
        this.load.image(MainMenu.BACKGROUND_KEY, MainMenu.BACKGROUND_PATH);
        this.load.image(MainMenu.LOGO_KEY, MainMenu.LOGO_PATH);
        this.load.audio(MainMenu.MUSIC_KEY, MainMenu.MUSIC_PATH);
    }

    public startScene(): void {
        this.addUILayer("MAIN");

        // Center the viewport
        let size = this.viewport.getHalfSize();
        this.viewport.setFocus(size);
        this.viewport.setZoomLevel(1);

        let background = this.add.sprite(MainMenu.BACKGROUND_KEY, "MAIN");
        background.position = this.getViewport().getHalfSize();
        background.scale = new Vec2(0.5, 0.67);

        let logo = this.add.sprite(MainMenu.LOGO_KEY, "MAIN");
        logo.position = new Vec2(this.getViewport().getHalfSize().x, this.getViewport().getHalfSize().y - 200);
        logo.scale = new Vec2(0.45, 0.45);

        let MenuPanel = [
            {text: "PLAY", goTo: Level1},
            {text: "CONTROLS", goTo: ControlsScreen},
            {text: "ABOUT", goTo: AboutScreen},
            {text: "CREDITS", goTo: CreditsScreen},
            {text: "HELP", goTo: HelpScreen},
            {text: "LEVELS", goTo: LevelSelectScreen}
        ]

        for (let i = 0; i < MenuPanel.length; i++) {
            let button = <Button>this.add.uiElement(UIElementType.BUTTON, "MAIN", {position: new Vec2(size.x, size.y+(i*60)), text: ""});
            button.backgroundColor = new Color(0, 0, 0, 0.9);
            button.setPadding(new Vec2(175, 10));
            button.onClick = () => {
                if (MenuPanel[i].text == "PLAY") {
                    this.emitter.fireEvent(GameEventType.STOP_SOUND, {key: MainMenu.MUSIC_KEY, holdReference: false});
                }
                this.sceneManager.changeToScene(MenuPanel[i].goTo);
            }

            let text = <Label>this.add.uiElement(UIElementType.LABEL, "MAIN", {position: new Vec2(size.x, size.y+(i*60)), text: MenuPanel[i].text});
            text.font = "handjet_square_doublemedium";
            text.fontSize = 40;
            text.textColor = Color.WHITE;
            text.backgroundColor = Color.TRANSPARENT
        }

        this.emitter.fireEvent(GameEventType.PLAY_MUSIC, {key: MainMenu.MUSIC_KEY, loop: true, holdReference: true})

    }

    public unloadScene(): void {
        
    }
}

