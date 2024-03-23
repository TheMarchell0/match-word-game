import {wordsDatabase} from "../../database/wordsDatabase.js";
import wordConstructor from "./wordConstructor.js";

function createLvl () {
    const mainWord = wordsDatabase['lvl_1']['mainWord'];
    const mainWordLetters = mainWord.split('');
    let mainWordLettersList = document.querySelector('.js-main-word-letters-list');
    let result = '';

    for (let i = 0; i < mainWordLetters.length; i++) {
        result += `<li class="main-word-letters__item js-word-letters" data-word-id="${i + 1}"><button class="main-word-letters__button">${mainWordLetters[i]}</button></li>`;
    }
    mainWordLettersList.innerHTML = result;

    wordConstructor(wordsDatabase['lvl_1']['searchWords']);
}

export default createLvl;