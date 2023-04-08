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

    public loadScene(): void {
        this.load.image(ControlsScreen.BACKGROUND_KEY, ControlsScreen.BACKGROUND_PATH);
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

        // Create a label named "Controls"
        let controlsLabel = <Label>this.add.uiElement(UIElementType.LABEL, "MAIN", {position: new Vec2(size.x, size.y - 275), text: "CONTROLS"});
        controlsLabel.textColor = Color.WHITE;
        controlsLabel.font = "Handjet";
        controlsLabel.fontSize = 96;

        // WASD Head Div
        let WASDLabel = <Label>this.add.uiElement(UIElementType.LABEL, "MAIN", {position: new Vec2(size.x - 250, size.y - 50), text: ""});
        WASDLabel.backgroundColor = new Color(0, 0, 0, 0.9);
        WASDLabel.setPadding(new Vec2(125, 125));
        // WASD Title Text Div
        let WASDTitleLabel = <Label>this.add.uiElement(UIElementType.LABEL, "MAIN", {position: new Vec2(size.x - 250, size.y - 155), text: "BASIC"});
        WASDTitleLabel.textColor = Color.WHITE;
        WASDTitleLabel.font = "Handjet";
        WASDTitleLabel.fontSize = 48;
        // WASD Content Text Div
        let text = [
            {text: "W: Jump", 
                pos: new Vec2(size.x - 300, size.y - 105)},
            {text: "A: Move Left", 
                pos: new Vec2(size.x - 282, size.y - 55)},
            {text: "S: Move Down", 
                pos: new Vec2(size.x - 274, size.y - 5)},
            {text: "D: Move Right", 
                pos: new Vec2(size.x - 275, size.y + 45)},
        ]
        for (let i = 0; i < text.length; i++) {
            let label = <Label>this.add.uiElement(UIElementType.LABEL, "MAIN", {position: text[i].pos, text: text[i].text});
            label.textColor = Color.WHITE;
            label.font = "Handjet";
            label.fontSize = 32;
        }
        
        // Mouse label
        let mouseLabel = <Label>this.add.uiElement(UIElementType.LABEL, "MAIN", {position: new Vec2(size.x + 175, size.y - 75), text: ""});
        mouseLabel.backgroundColor = new Color(0, 0, 0, 0.9)
        mouseLabel.setPadding(new Vec2(225, 100));
        // Mouse Title Text Div
        let mouseTitleLabel = <Label>this.add.uiElement(UIElementType.LABEL, "MAIN", {position: new Vec2(size.x + 175, size.y - 155), text: "SPECIAL"});
        mouseTitleLabel.textColor = Color.WHITE;
        mouseTitleLabel.font = "Handjet";
        mouseTitleLabel.fontSize = 48;
        // Mouse Content Text Div
        let mouseText = [
            {text: "Mouse 1: Kernel Rifle", 
                pos: new Vec2(size.x + 109, size.y - 105)},
            {text: "Mouse 1 (Hold): Popcorn Shotgun", 
                pos: new Vec2(size.x + 175, size.y - 55)},
            {text: "Mouse 2: Silk Grapple", 
                pos: new Vec2(size.x + 112, size.y - 5)}
        ]
        for (let i = 0; i < mouseText.length; i++) {
            let label = <Label>this.add.uiElement(UIElementType.LABEL, "MAIN", {position: mouseText[i].pos, text: mouseText[i].text});
            label.textColor = Color.WHITE;
            label.font = "Handjet";
            label.fontSize = 32;
        }

        // Create a back button
        let backBtn = <Button>this.add.uiElement(UIElementType.BUTTON, "MAIN", {position: new Vec2(size.x, size.y + 275), text: "BACK"});
        backBtn.backgroundColor = new Color(0, 0, 0, 0.9)
        backBtn.setPadding(new Vec2(50, 10));
        backBtn.font = "Handjet";
        backBtn.fontSize = 48;

        // When the play button is clicked, go to the next scene
        backBtn.onClick = () => {
            this.emitter.fireEvent(GameEventType.STOP_SOUND, {key: MainMenu.MUSIC_KEY, holdReference: false});
            this.sceneManager.changeToScene(MainMenu);
        }

    }

    public unloadScene(): void {

    }
}

