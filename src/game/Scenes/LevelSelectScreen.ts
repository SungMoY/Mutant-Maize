import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import { GameEventType } from "../../Wolfie2D/Events/GameEventType";
import Button from "../../Wolfie2D/Nodes/UIElements/Button";
import Label from "../../Wolfie2D/Nodes/UIElements/Label";
import { UIElementType } from "../../Wolfie2D/Nodes/UIElements/UIElementTypes";
import Scene from "../../Wolfie2D/Scene/Scene";
import Color from "../../Wolfie2D/Utils/Color";
import Level from "./Level";
import Level1 from "./Level1";
import Level2 from "./Level2";
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

    public addLevel(text: string, level: any, position: Vec2): void {
        let box = <Button>this.add.uiElement(UIElementType.BUTTON, "MAIN", {position: position, text: ""});
        box.backgroundColor = new Color(0, 0, 0, 0.9)
        box.setPadding(new Vec2(150, 20));
        box.onClick = () => {
            if (level) {
                box.onClickEventId = "goto";
                this.emitter.fireEvent(GameEventType.STOP_SOUND, {key: MainMenu.MUSIC_KEY, holdReference: false});
                this.sceneManager.changeToScene(level);
            }
        }
        // create text
        let line = <Label>this.add.uiElement(UIElementType.LABEL, "MAIN", {position: position, text: text});
        line.textColor = Color.WHITE;
        line.font = "Verdana";
        line.fontSize = 36;
        line.setPadding(new Vec2(10, 10));
        line.backgroundColor = Color.TRANSPARENT
        line.borderColor = Color.TRANSPARENT
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
        lvlSelectLabel.font = "Verdana";
        lvlSelectLabel.fontSize = 96;

        // lvlSelectDiv text
        let lvlSelectText = <Label>this.add.uiElement(UIElementType.LABEL, "MAIN", {position: new Vec2(size.x, size.y-105), text: ""});
        lvlSelectText.backgroundColor = Color.TRANSPARENT;
        lvlSelectText.setPadding(new Vec2(450, 93));
        //levels text per line NOTE THAT THEY ARE NOT IN NUMERICAL ORDER


        // I'm so sorry for this.
        let positions = []
        for (let i = 0; i < 3; i++) {
            positions.push(new Vec2(size.x-175, size.y-140 + (i*100)))
        }
        for (let i = 3; i < 6; i++) {
            positions.push(new Vec2(size.x+175, size.y-140 + ((i-3)*100)))
        }

        this.addLevel("1. Cornfield", Level1, positions[0]);
        this.addLevel("2. Barn Wall", Level2, positions[3]);
        this.addLevel("3. Barn", null, positions[1]);
        this.addLevel("4. Garden", null, positions[4]);
        this.addLevel("5. House Wall", null, positions[2]);
        this.addLevel("6. House", null, positions[5]);
        

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

        // REMOVE LATER
        this.sceneManager.changeToScene(Level2);
        
    }

    public unloadScene(): void {

    }
}

