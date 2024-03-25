import startGame from "./functions/startGame.js";
import createLvl from "./functions/createLvl.js";
import getCookie from "./functions/helpers/getCookie.js";

document.addEventListener('DOMContentLoaded', () => {
    if (getCookie('gameIsRunning')) {
        createLvl(getCookie('currentLvl'));
    } else {
        startGame();
    }
})