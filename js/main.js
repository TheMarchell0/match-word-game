import startGame from "./functions/startGame.js";
import createLvl from "./functions/createLvl.js";

document.addEventListener('DOMContentLoaded', () => {
    startGame();
    createLvl(1);
})