import createCookie from "./helpers/createCookie.js";

const playButton = document.querySelector('.js-play-icon'),
    startSection = document.querySelector('.js-start-section'),
    learningSection = document.querySelector('.js-learning-section'),
    learningCompletedButton = document.querySelector('.js-learning-button'),
    gameSection = document.querySelector('.js-game-section');

function startGame() {
    startSection.classList.remove('disable');

    playButton.addEventListener('click', ()=> {
        startSection.classList.add('disable');
        learningSection.classList.remove('disable');
    })

    learningCompletedButton.addEventListener('click', ()=> {
        learningSection.classList.add('disable');
        gameSection.classList.remove('disable');
        createCookie('gameIsRunning', true)
        createCookie('currentLvl', 1)
    })
}

export default startGame;