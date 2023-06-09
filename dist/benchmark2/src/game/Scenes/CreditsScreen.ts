import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import { GameEventType } from "../../Wolfie2D/Events/GameEventType";
import Button from "../../Wolfie2D/Nodes/UIElements/Button";
import Label from "../../Wolfie2D/Nodes/UIElements/Label";
import { UIElementType } from "../../Wolfie2D/Nodes/UIElements/UIElementTypes";
import Scene from "../../Wolfie2D/Scene/Scene";
import Color from "../../Wolfie2D/Utils/Color";
import MainMenu from "./MainMenu";

export default class CreditsScreen extends Scene {

    public static readonly BACKGROUND_KEY = "BACKGROUND";
    public static readonly BACKGROUND_PATH = "game_assets/images/background.png";

    public static readonly LOGO_KEY = "LOGO";
    public static readonly LOGO_PATH = "game_assets/images/logo.png";


    public loadScene(): void {
        this.load.image(CreditsScreen.BACKGROUND_KEY, CreditsScreen.BACKGROUND_PATH);
        this.load.image(CreditsScreen.LOGO_KEY, CreditsScreen.LOGO_PATH);
    }

    public startScene(): void {
        this.addUILayer("MAIN");

        // Center the viewport
        let size = this.viewport.getHalfSize();
        this.viewport.setFocus(size);
        this.viewport.setZoomLevel(1);

        let background = this.add.sprite(CreditsScreen.BACKGROUND_KEY, "MAIN");
        background.position = this.getViewport().getHalfSize();
        background.scale = new Vec2(0.5, 0.67);

        // Create a label named "ABOUT"
        let controlsLabel = <Label>this.add.uiElement(UIElementType.LABEL, "MAIN", {position: new Vec2(size.x, size.y - 275), text: "ABOUT"});
        controlsLabel.textColor = Color.WHITE;
        controlsLabel.font = "'handjet_square_doublemedium'";
        controlsLabel.fontSize = 96;

        // Create head div
        let creditsLabel = <Label>this.add.uiElement(UIElementType.LABEL, "MAIN", {position: new Vec2(size.x, size.y-30), text: ""});
        creditsLabel.backgroundColor = new Color(0, 0, 0, 0.9);
        creditsLabel.setPadding(new Vec2(200, 150));

        // developer div
        let developerLabel = <Label>this.add.uiElement(UIElementType.LABEL, "MAIN", {position: new Vec2(size.x, size.y-105), text: ""});
        developerLabel.backgroundColor = Color.TRANSPARENT;
        developerLabel.setPadding(new Vec2(450, 93));
        //developer title
        let developerTitle = <Label>this.add.uiElement(UIElementType.LABEL, "MAIN", {position: new Vec2(size.x, size.y-160), text: "Developers"});
        developerTitle.textColor = Color.WHITE;
        developerTitle.font = "'handjet_square_doublemedium'";
        developerTitle.fontSize = 36;
        //developer text per line
        let developerText = [
            "Aaryamann Kanojia",
            "Jewick Shi",
            "Sung Mo Yang"
        ]
        for (let i = 0; i < developerText.length; i++) {
            let developerLine = <Label>this.add.uiElement(UIElementType.LABEL, "MAIN", {position: new Vec2(size.x, size.y-120 + (i*25)), text: developerText[i]});
            developerLine.textColor = Color.WHITE;
            developerLine.font = "'handjet_square_doublemedium'";
            developerLine.fontSize = 24;
            developerLine.setPadding(new Vec2(10, 10));
        }

        // engine dev div
        let engineDev = <Label>this.add.uiElement(UIElementType.LABEL, "MAIN", {position: new Vec2(size.x, size.y+110), text: ""});
        engineDev.backgroundColor = Color.TRANSPARENT;
        engineDev.setPadding(new Vec2(450, 93));
        //engine dev title
        let engineDevTitle = <Label>this.add.uiElement(UIElementType.LABEL, "MAIN", {position: new Vec2(size.x, size.y+35), text: "Wolfie2D Engine By"});
        engineDevTitle.textColor = Color.WHITE;
        engineDevTitle.font = "'handjet_square_doublemedium'";
        engineDevTitle.fontSize = 36;
        //engine dev text
        let engineDevText = [
            "Richard McKenna",
            "Joe Weaver"
        ]
        for (let i = 0; i < engineDevText.length; i++) {
            let engineDevLine = <Label>this.add.uiElement(UIElementType.LABEL, "MAIN", {position: new Vec2(size.x, size.y+70 + (i*25)), text: engineDevText[i]});
            engineDevLine.textColor = Color.WHITE;
            engineDevLine.font = "'handjet_square_doublemedium'";
            engineDevLine.fontSize = 24;
        }
        
        // Create a back button
        let backBtn = <Button>this.add.uiElement(UIElementType.BUTTON, "MAIN", {position: new Vec2(size.x, size.y + 275), text: "BACK"});
        backBtn.backgroundColor = new Color(0, 0, 0, 0.9)
        backBtn.setPadding(new Vec2(50, 10));
        backBtn.font = "'handjet_square_doublemedium'";
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

