import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import { GameEventType } from "../../Wolfie2D/Events/GameEventType";
import Button from "../../Wolfie2D/Nodes/UIElements/Button";
import Label from "../../Wolfie2D/Nodes/UIElements/Label";
import { UIElementType } from "../../Wolfie2D/Nodes/UIElements/UIElementTypes";
import Scene from "../../Wolfie2D/Scene/Scene";
import Color from "../../Wolfie2D/Utils/Color";
import MainMenu from "./MainMenu";

export default class HelpScreen extends Scene {

    public static readonly BACKGROUND_KEY = "BACKGROUND";
    public static readonly BACKGROUND_PATH = "game_assets/images/background.png";

    public static readonly LOGO_KEY = "LOGO";
    public static readonly LOGO_PATH = "game_assets/images/logo.png";

    public loadScene(): void {
        this.load.image(HelpScreen.BACKGROUND_KEY, HelpScreen.BACKGROUND_PATH);
        this.load.image(HelpScreen.LOGO_KEY, HelpScreen.LOGO_PATH);
    }

    public startScene(): void {
        this.addUILayer("MAIN");

        // Center the viewport
        let size = this.viewport.getHalfSize();
        this.viewport.setFocus(size);
        this.viewport.setZoomLevel(1);

        let background = this.add.sprite(HelpScreen.BACKGROUND_KEY, "MAIN");
        background.position = this.getViewport().getHalfSize();
        background.scale = new Vec2(0.5, 0.67);

        // Create a label named "Cheats"
        let cheatsLabel = <Label>this.add.uiElement(UIElementType.LABEL, "MAIN", {position: new Vec2(size.x, size.y - 275), text: "CHEATS"});
        cheatsLabel.textColor = Color.WHITE;
        cheatsLabel.font = "Verdana";
        cheatsLabel.fontSize = 96;

        // Create head div
        let cheatsDiv = <Label>this.add.uiElement(UIElementType.LABEL, "MAIN", {position: new Vec2(size.x, size.y-30), text: ""});
        cheatsDiv.backgroundColor = new Color(0, 0, 0, 0.9);
        cheatsDiv.setPadding(new Vec2(200, 150));

        // cheats div
        let cheatsText = <Label>this.add.uiElement(UIElementType.LABEL, "MAIN", {position: new Vec2(size.x, size.y-105), text: ""});
        cheatsText.backgroundColor = Color.TRANSPARENT;
        cheatsText.setPadding(new Vec2(450, 93));
        //cheats text per line
        let cheatsTextLine = [
            "1: Go to Level 1",
            "2: Teleport to end of Level 1",
            "3: Something",
            "G: Debug Screen",
            "I: invulnerable",
            "M: Spawn Mouse",
            "B: Spawn Bird",
            "H: Spawn Chicken",
            "J: Spawn Dog",
            "K: Kill All Enemy"
        ]
        for (let i = 0; i < cheatsTextLine.length; i++) {
            let cheatsLine = <Label>this.add.uiElement(UIElementType.LABEL, "MAIN", {position: new Vec2(size.x, size.y-120 + (i*30)), text: cheatsTextLine[i]});
            cheatsLine.textColor = Color.WHITE;
            cheatsLine.font = "Verdana";
            cheatsLine.fontSize = 24;
            cheatsLine.setPadding(new Vec2(10, 10));
        }
        // Create a back button
        let backBtn = <Button>this.add.uiElement(UIElementType.BUTTON, "MAIN", {position: new Vec2(size.x, size.y + 275), text: "BACK"});
        backBtn.backgroundColor = new Color(0, 0, 0, 0.9)
        backBtn.setPadding(new Vec2(50, 10));
        backBtn.font = "Verdana";
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

