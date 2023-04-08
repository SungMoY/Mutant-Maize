import Game from "./Wolfie2D/Loop/Game";
import { GameControls } from "./game/GameControls";
import SplashScreen from "./game/Scenes/SplashScreen";

import MainMenu from "./game/Scenes/MainMenu";
import ControlsScreen from "./game/Scenes/ControlsScreen";
import AboutScreen from "./game/Scenes/AboutScreen";
import CreditsScreen from "./game/Scenes/CreditsScreen";
import HelpScreen from "./game/Scenes/HelpScreen";
import LevelSelectScreen from "./game/Scenes/LevelSelectScreen";

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
            {name: GameControls.ATTACK, keys: ["x"]}
        ],
        useWebGL: false,                        // Tell the game we want to use webgl
        showDebug: false                       // Whether to show debug messages. You can change this to true if you want
    }

    // Create a game with the options specified
    const game = new Game(options);

    // Start our game
    //game.start(SplashScreen, {});
    // CHANGED FOR TESTING, CHANGE BACK LATER
    game.start(LevelSelectScreen, {});
})();