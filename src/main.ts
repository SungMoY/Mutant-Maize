import Game from "./Wolfie2D/Loop/Game";
import { GameControls } from "./game/GameControls";
import AboutScreen from "./game/Scenes/AboutScreen";
import ControlsScreen from "./game/Scenes/ControlsScreen";
import CreditsScreen from "./game/Scenes/CreditsScreen";
import Level from "./game/Scenes/Level";
import Level1 from "./game/Scenes/Level1";
import Level2 from "./game/Scenes/Level2";
import LevelSelectScreen from "./game/Scenes/LevelSelectScreen";
import MainMenu from "./game/Scenes/MainMenu";
import SplashScreen from "./game/Scenes/SplashScreen";

// The main function is your entrypoint into Wolfie2D. Specify your first scene and any options here.
(function main(){

    // Set up options for our game
    let options = {
        canvasSize: {x: 960, y: 720},          // The size of the game
        clearColor: {r: 0, g: 0, b: 0},   // The color the game clears to
        inputs: [
            {name: GameControls.MOVE_LEFT, keys: ["a"]},
            {name: GameControls.MOVE_RIGHT, keys: ["d"]},
            {name: GameControls.JUMP, keys: ["w", "space"]},
            {name: GameControls.RIFLE, keys: ["t"]}, // and left click
            {name: GameControls.SHOTGUN, keys: ["f"]},
            {name: GameControls.GRAPPLE, keys: ["shift"]},
            {name: GameControls.CHEAT_ONE, keys: ["1"]},
            {name: GameControls.CHEAT_TWO, keys: ["2"]},
            {name: GameControls.CHEAT_THREE, keys: ["3"]}
        ],
        useWebGL: false,                        // Tell the game we want to use webgl
        showDebug: false                       // Whether to show debug messages. You can change this to true if you want
    }

    // Create a game with the options specified
    const game = new Game(options);

    // Start our game
    game.start(SplashScreen, {});
})();