import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import { GameEventType } from "../../Wolfie2D/Events/GameEventType";
import Input from "../../Wolfie2D/Input/Input";
import { GraphicType } from "../../Wolfie2D/Nodes/Graphics/GraphicTypes";
import Button from "../../Wolfie2D/Nodes/UIElements/Button";
import Label from "../../Wolfie2D/Nodes/UIElements/Label";
import { UIElementType } from "../../Wolfie2D/Nodes/UIElements/UIElementTypes";
import Scene from "../../Wolfie2D/Scene/Scene";
import Color from "../../Wolfie2D/Utils/Color";
import MainMenu from "./MainMenu";

export default class SplashScreen extends Scene {

    public static readonly BACKGROUND_KEY = "BACKGROUND";
    public static readonly BACKGROUND_PATH = "game_assets/images/background.png";

    public static readonly LOGO_KEY = "LOGO";
    public static readonly LOGO_PATH = "game_assets/images/logo.png";

    public static readonly MUSIC_KEY = "MAIN_MENU_MUSIC";
    public static readonly MUSIC_PATH = "game_assets/music/BGM/LobbyBGM.mp3";

    public loadScene(): void {
        this.load.image(SplashScreen.LOGO_KEY, SplashScreen.LOGO_PATH);
        this.load.image(SplashScreen.BACKGROUND_KEY, SplashScreen.BACKGROUND_PATH);
        this.load.audio(SplashScreen.MUSIC_KEY, SplashScreen.MUSIC_PATH)

    }

    public startScene(): void {
        this.addUILayer("MAIN");

        let background = this.add.sprite(SplashScreen.BACKGROUND_KEY, "MAIN");
        background.position = this.getViewport().getHalfSize();
        background.scale = new Vec2(0.25, 0.25);
        
        let logo = this.add.sprite(SplashScreen.LOGO_KEY, "MAIN");
        logo.position = new Vec2(this.getViewport().getHalfSize().x, this.getViewport().getHalfSize().y - 50);
        logo.scale = new Vec2(0.67, 0.67);

        let playButton = <Label>this.add.uiElement(UIElementType.LABEL, "MAIN", {position: new Vec2(400, 400), text: "CLICK TO START"});
        playButton.backgroundColor = new Color(0, 0, 0, 0.9)
        playButton.position = new Vec2(this.getViewport().getHalfSize().x, this.getViewport().getHalfSize().y + 250);
        playButton.font = "Verdana";
        playButton.fontSize = 56;
        playButton.textColor = Color.WHITE;
        playButton.setPadding(new Vec2(50, 5));

    }

    public updateScene(deltaT: number): void {
        if (Input.isMouseJustPressed()) {
            this.sceneManager.changeToScene(MainMenu);
        }
    }

    public unloadScene(): void {
        this.emitter.fireEvent(GameEventType.PLAY_MUSIC, {key: MainMenu.MUSIC_KEY, loop: true, holdReference: true})
        this.load.keepImage(SplashScreen.LOGO_KEY);
        this.load.keepImage(SplashScreen.BACKGROUND_KEY);
        this.load.keepAudio(SplashScreen.MUSIC_KEY);
    }
}

