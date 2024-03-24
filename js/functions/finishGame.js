const gameSection = document.querySelector('.js-game-section'),
    finishSection = document.querySelector('.js-finish-section');

function finishGame() {
    gameSection.classList.add('disable');
    finishSection.classList.remove('disable');
}

export default finishGame;