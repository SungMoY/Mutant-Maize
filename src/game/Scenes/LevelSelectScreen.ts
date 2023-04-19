import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import { GameEventType } from "../../Wolfie2D/Events/GameEventType";
import Button from "../../Wolfie2D/Nodes/UIElements/Button";
import Label from "../../Wolfie2D/Nodes/UIElements/Label";
import { UIElementType } from "../../Wolfie2D/Nodes/UIElements/UIElementTypes";
import Scene from "../../Wolfie2D/Scene/Scene";
import Color from "../../Wolfie2D/Utils/Color";
import Level1 from "./Level1";
import MainMenu from "./MainMenu";

export default class LevelSelectScreen extends Scene {

    public static readonly MUSIC_KEY = "MAIN_MENU_MUSIC";
    public static readonly MUSIC_PATH = "game_assets/music/menu2.mp3";

    public static readonly BACKGROUND_KEY = "BACKGROUND";
    public static readonly BACKGROUND_PATH = "game_assets/images/background.png";

    public static readonly LOGO_KEY = "LOGO";
    public static readonly LOGO_PATH = "game_assets/images/logo.png";


    public loadScene(): void {
        this.load.audio(LevelSelectScreen.MUSIC_KEY, LevelSelectScreen.MUSIC_PATH);
        this.load.image(LevelSelectScreen.BACKGROUND_KEY, LevelSelectScreen.BACKGROUND_PATH);
        this.load.image(LevelSelectScreen.LOGO_KEY, LevelSelectScreen.LOGO_PATH);
    }

    public startScene(): void {
        this.addUILayer("MAIN");

        // Center the viewport
        let size = this.viewport.getHalfSize();
        this.viewport.setFocus(size);
        this.viewport.setZoomLevel(1);

        let background = this.add.sprite(LevelSelectScreen.BACKGROUND_KEY, "MAIN");
        background.position = this.getViewport().getHalfSize();
        background.scale = new Vec2(0.5, 0.67);

        // Create a label named "Level Select"
        let lvlSelectLabel = <Label>this.add.uiElement(UIElementType.LABEL, "MAIN", {position: new Vec2(size.x, size.y - 275), text: "Level Select"});
        lvlSelectLabel.textColor = Color.WHITE;
        lvlSelectLabel.font = "handjet_square_doublemedium";
        lvlSelectLabel.fontSize = 96;

        // lvlSelectDiv text
        let lvlSelectText = <Label>this.add.uiElement(UIElementType.LABEL, "MAIN", {position: new Vec2(size.x, size.y-105), text: ""});
        lvlSelectText.backgroundColor = Color.TRANSPARENT;
        lvlSelectText.setPadding(new Vec2(450, 93));
        //cheats text per line
        let lvlSelectTextLines = [
            {text: "1. Cornfield", goto: Level1},
            {text: "2. Barn Wall"},
            {text: "3. Barn"},
            {text: "4. Garden"},
            {text: "5. House Wall"},
            {text: "6. House"},
        ]
        for (let i = 0; i < lvlSelectTextLines.length/2; i++) {
            // create box around it
            let box = <Button>this.add.uiElement(UIElementType.BUTTON, "MAIN", {position: new Vec2(size.x-175, size.y-140 + (i*100)), text: ""});
            box.backgroundColor = new Color(0, 0, 0, 0.9)
            box.setPadding(new Vec2(150, 20));
            box.onClick = () => {
                if (lvlSelectTextLines[i].goto) {
                    box.onClickEventId = "goto";
                    this.emitter.fireEvent(GameEventType.STOP_SOUND, {key: MainMenu.MUSIC_KEY, holdReference: false});
                    this.sceneManager.changeToScene(lvlSelectTextLines[i].goto);
                }
            }
            // create text
            let line = <Label>this.add.uiElement(UIElementType.LABEL, "MAIN", {position: new Vec2(size.x-175, size.y-140 + (i*100)), text: lvlSelectTextLines[i].text});
            line.textColor = Color.WHITE;
            line.font = "handjet_square_doublemedium";
            line.fontSize = 56;
            line.setPadding(new Vec2(10, 10));
            line.backgroundColor = Color.TRANSPARENT
            line.borderColor = Color.TRANSPARENT
        }
        for (let i = 3; i < lvlSelectTextLines.length; i++) {
            // create box around it
            let box = <Button>this.add.uiElement(UIElementType.BUTTON, "MAIN", {position: new Vec2(size.x+175, size.y-140 + ((i-3)*100)), text: ""});
            box.backgroundColor = new Color(0, 0, 0, 0.9)
            box.setPadding(new Vec2(150, 20));
            box.onClick = () => {
                if (lvlSelectTextLines[i].goto) {
                    box.onClickEventId = "goto";
                    this.emitter.fireEvent(GameEventType.STOP_SOUND, {key: MainMenu.MUSIC_KEY, holdReference: false});
                    this.sceneManager.changeToScene(lvlSelectTextLines[i].goto);
                }
            }
            // create text
            let line = <Label>this.add.uiElement(UIElementType.LABEL, "MAIN", {position: new Vec2(size.x+175, size.y-140 + ((i-3)*100)), text: lvlSelectTextLines[i].text});
            line.textColor = Color.WHITE;
            line.font = "handjet_square_doublemedium";
            line.fontSize = 56;
            line.setPadding(new Vec2(10, 10));
            line.backgroundColor = Color.TRANSPARENT
            line.borderColor = Color.TRANSPARENT
        }

        // Create a back button
        let backBtn = <Button>this.add.uiElement(UIElementType.BUTTON, "MAIN", {position: new Vec2(size.x, size.y + 275), text: "BACK"});
        backBtn.backgroundColor = new Color(0, 0, 0, 0.9)
        backBtn.setPadding(new Vec2(50, 10));
        backBtn.font = "handjet_square_doublemedium";
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

