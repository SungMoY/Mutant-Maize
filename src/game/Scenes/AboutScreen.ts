import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import { GameEventType } from "../../Wolfie2D/Events/GameEventType";
import Button from "../../Wolfie2D/Nodes/UIElements/Button";
import Label from "../../Wolfie2D/Nodes/UIElements/Label";
import { UIElementType } from "../../Wolfie2D/Nodes/UIElements/UIElementTypes";
import Scene from "../../Wolfie2D/Scene/Scene";
import Color from "../../Wolfie2D/Utils/Color";
import MainMenu from "./MainMenu";

export default class AboutScreen extends Scene {

    public static readonly BACKGROUND_KEY = "BACKGROUND";
    public static readonly BACKGROUND_PATH = "game_assets/images/background.png";

    public static readonly LOGO_KEY = "LOGO";
    public static readonly LOGO_PATH = "game_assets/images/logo.png";

    public static readonly MUSIC_KEY = "MAIN_MENU_MUSIC";
    public static readonly MUSIC_PATH = "game_assets/music/BGM/LobbyBGM.mp3";

    public loadScene(): void {
        this.load.getImage(AboutScreen.BACKGROUND_KEY);
        this.load.getImage(AboutScreen.LOGO_KEY);
    }

    public startScene(): void {
        this.addUILayer("MAIN");

        // Center the viewport
        let size = this.viewport.getHalfSize();
        this.viewport.setFocus(size);
        this.viewport.setZoomLevel(1);

        let background = this.add.sprite(AboutScreen.BACKGROUND_KEY, "MAIN");
        background.position = this.getViewport().getHalfSize();
        background.scale = new Vec2(0.25, 0.25);
        
        // Create a label named "ABOUT"
        let controlsLabel = <Label>this.add.uiElement(UIElementType.LABEL, "MAIN", {position: new Vec2(size.x, size.y - 275), text: "ABOUT"});
        controlsLabel.textColor = Color.WHITE;
        controlsLabel.font = "Verdana";
        controlsLabel.fontSize = 96;

        // Create div
        let AboutLabel = <Label>this.add.uiElement(UIElementType.LABEL, "MAIN", {position: new Vec2(size.x, size.y), text: ""});
        AboutLabel.backgroundColor = new Color(0, 0, 0, 0.9);
        AboutLabel.setPadding(new Vec2(450, 200));

        // backstory div
        let backstoryLabel = <Label>this.add.uiElement(UIElementType.LABEL, "MAIN", {position: new Vec2(size.x, size.y-105), text: ""});
        backstoryLabel.backgroundColor = Color.TRANSPARENT;
        backstoryLabel.setPadding(new Vec2(450, 93));
        //backstory title
        let backstoryTitle = <Label>this.add.uiElement(UIElementType.LABEL, "MAIN", {position: new Vec2(size.x, size.y-180), text: "Backstory"});
        backstoryTitle.textColor = Color.WHITE;
        backstoryTitle.font = "Verdana";
        backstoryTitle.fontSize = 36;
        //backstory text per line
        let backstoryText = [
            "Rob the Cob is a mature ear of corn during the Fall. He doesn’t know when gained sentience but",
            "continued to live out his days observing the world. Until one day he watches his friends and",
            "family experiments that the farmers exact on their lost comrades. When evening starts to roll",
            "around, the farmers stop for the day, Rob manages to escape the doom of being harvested. As",
            "night rolls in he equips himself with an arsenal of corn related tools, Rob seeks to escape the",
            "farmland and starts plans to build an army to seek revenge."
        ]
        for (let i = 0; i < backstoryText.length; i++) {
            let backstoryLine = <Label>this.add.uiElement(UIElementType.LABEL, "MAIN", {position: new Vec2(size.x, size.y-140 + (i*25)), text: backstoryText[i]});
            backstoryLine.textColor = Color.WHITE;
            backstoryLine.font = "Verdana";
            backstoryLine.fontSize = 18;
            backstoryLine.setPadding(new Vec2(10, 10));
        }

        // objective div
        let objectiveLabel = <Label>this.add.uiElement(UIElementType.LABEL, "MAIN", {position: new Vec2(size.x, size.y+110), text: ""});
        objectiveLabel.backgroundColor = Color.TRANSPARENT;
        objectiveLabel.setPadding(new Vec2(450, 93));
        //objective title
        let objectiveTitle = <Label>this.add.uiElement(UIElementType.LABEL, "MAIN", {position: new Vec2(size.x, size.y+35), text: "Objective"});
        objectiveTitle.textColor = Color.WHITE;
        objectiveTitle.font = "Verdana";
        objectiveTitle.fontSize = 36;
        //objective text
        let objectiveText = [
            "Rob the Cob’s objective is to make his way through the farm with the goal of exacting revenge",
            "for his fallen corn brethren and ultimately escaping. Rob will use corn-related tools to overcome",
            "any obstacles in his way. Obstacles that Rob will encounter are bugs and pests that like to feed",
            "on crops,as well as the difficult terrain of barns. Bosses will be objects in a generic farm that",
            "seem opposing from a cob of corn’s perspective like a chicken and a dog."
    ]
        for (let i = 0; i < objectiveText.length; i++) {
            let objectiveLine = <Label>this.add.uiElement(UIElementType.LABEL, "MAIN", {position: new Vec2(size.x, size.y+70 + (i*25)), text: objectiveText[i]});
            objectiveLine.textColor = Color.WHITE;
            objectiveLine.font = "Verdana";
            objectiveLine.fontSize = 18;
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
        this.load.keepImage(AboutScreen.LOGO_KEY);
        this.load.keepImage(AboutScreen.BACKGROUND_KEY);
        this.load.keepAudio(AboutScreen.MUSIC_KEY);
    }
}

