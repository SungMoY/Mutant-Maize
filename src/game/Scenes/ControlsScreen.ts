import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import { GameEventType } from "../../Wolfie2D/Events/GameEventType";
import Button from "../../Wolfie2D/Nodes/UIElements/Button";
import Label, { HAlign } from "../../Wolfie2D/Nodes/UIElements/Label";
import { UIElementType } from "../../Wolfie2D/Nodes/UIElements/UIElementTypes";
import Scene from "../../Wolfie2D/Scene/Scene";
import Color from "../../Wolfie2D/Utils/Color";
import MainMenu from "./MainMenu";

export default class ControlsScreen extends Scene {

    public static readonly BACKGROUND_KEY = "BACKGROUND";
    public static readonly BACKGROUND_PATH = "game_assets/images/background.png";

    public static readonly LOGO_KEY = "LOGO";
    public static readonly LOGO_PATH = "game_assets/images/logo.png";

    public static readonly MUSIC_KEY = "MAIN_MENU_MUSIC";
    public static readonly MUSIC_PATH = "game_assets/music/BGM/LobbyBGM.mp3";

    public loadScene(): void {
        this.load.getImage(ControlsScreen.BACKGROUND_KEY);
        this.load.getImage(ControlsScreen.LOGO_KEY);
    }

    public startScene(): void {
        this.addUILayer("MAIN");

        // Center the viewport
        let size = this.viewport.getHalfSize();
        this.viewport.setFocus(size);
        this.viewport.setZoomLevel(1);

        let background = this.add.sprite(MainMenu.BACKGROUND_KEY, "MAIN");
        background.position = this.getViewport().getHalfSize();
        background.scale = new Vec2(0.25, 0.25);
        
        // Create a label named "Controls"
        let controlsLabel = <Label>this.add.uiElement(UIElementType.LABEL, "MAIN", {position: new Vec2(size.x, size.y - 275), text: "CONTROLS"});
        controlsLabel.textColor = Color.WHITE;
        controlsLabel.font = "Verdana";
        controlsLabel.fontSize = 96;

        // WASD Head Div
        let WASDLabel = <Label>this.add.uiElement(UIElementType.LABEL, "MAIN", {position: new Vec2(size.x - 250, size.y - 50), text: ""});
        WASDLabel.backgroundColor = new Color(0, 0, 0, 0.9);
        WASDLabel.setPadding(new Vec2(125, 125));
        // WASD Title Text Div
        let WASDTitleLabel = <Label>this.add.uiElement(UIElementType.LABEL, "MAIN", {position: new Vec2(size.x - 250, size.y - 155), text: "BASIC"});
        WASDTitleLabel.textColor = Color.WHITE;
        WASDTitleLabel.font = "Verdana";
        WASDTitleLabel.fontSize = 48;
        // WASD Content Text Div
        let text = [
            {text: "W: Jump", 
                pos: new Vec2(size.x - 295, size.y - 105)},
            {text: "A: Move Left", 
                pos: new Vec2(size.x - 264, size.y - 55)},
            {text: "S: Move Down", 
                pos: new Vec2(size.x - 250, size.y - 5)},
            {text: "D: Move Right", 
                pos: new Vec2(size.x - 252, size.y + 45)},
        ]
        for (let i = 0; i < text.length; i++) {
            let label = <Label>this.add.uiElement(UIElementType.LABEL, "MAIN", {position: text[i].pos, text: text[i].text});
            label.textColor = Color.WHITE;
            label.font = "Verdana";
            label.fontSize = 32;
        }
        
        // Mouse label
        let mouseLabel = <Label>this.add.uiElement(UIElementType.LABEL, "MAIN", {position: new Vec2(size.x + 175, size.y - 75), text: ""});
        mouseLabel.backgroundColor = new Color(0, 0, 0, 0.9)
        mouseLabel.setPadding(new Vec2(225, 100));
        // Mouse Title Text Div
        let mouseTitleLabel = <Label>this.add.uiElement(UIElementType.LABEL, "MAIN", {position: new Vec2(size.x + 175, size.y - 155), text: "SPECIAL"});
        mouseTitleLabel.textColor = Color.WHITE;
        mouseTitleLabel.font = "Verdana";
        mouseTitleLabel.fontSize = 48;
        // Mouse Content Text Div
        let mouseText = [
            {text: "Mouse 1: Kernel Rifle", 
                pos: new Vec2(size.x + 130, size.y - 105)},
            {text: "Mouse 2: Popcorn Shotgun", 
                pos: new Vec2(size.x + 175, size.y - 55)},
            {text: "Shift: Silk Grapple", 
                pos: new Vec2(size.x + 107, size.y - 5)}
        ]
        for (let i = 0; i < mouseText.length; i++) {
            let label = <Label>this.add.uiElement(UIElementType.LABEL, "MAIN", {position: mouseText[i].pos, text: mouseText[i].text});
            label.textColor = Color.WHITE;
            label.font = "Verdana";
            label.fontSize = 32;
        }

        // Create a back button
        let backBtn = <Button>this.add.uiElement(UIElementType.BUTTON, "MAIN", {position: new Vec2(size.x, size.y + 275), text: "BACK"});
        backBtn.backgroundColor = new Color(0, 0, 0, 0.9)
        backBtn.setPadding(new Vec2(50, 10));
        backBtn.font = "Verdana";
        backBtn.fontSize = 48;

        // When the play button is clicked, go to the next scene
        backBtn.onClick = () => {
            this.sceneManager.changeToScene(MainMenu);
        }

    }

    public unloadScene(): void {
        this.emitter.fireEvent(GameEventType.STOP_SOUND, {key: MainMenu.MUSIC_KEY, holdReference: false});
        this.load.keepImage(ControlsScreen.LOGO_KEY);
        this.load.keepImage(ControlsScreen.BACKGROUND_KEY);
        this.load.keepAudio(ControlsScreen.MUSIC_KEY);
    }
}

