import {wordsDatabase} from "../../database/wordsDatabase.js";
import wordConstructor from "./wordConstructor.js";

function createLvl(lvl) {
    const findWordsCountNumber = document.querySelector('.js-find-words-count'),
        findWordsList = document.querySelector('.js-find-words-list'),
        lvlCount = document.querySelector('.js-lvl-count'),
        mainWord = wordsDatabase[`lvl_${lvl}`]['mainWord'],
        mainWordLetters = mainWord.split(''),
        mainWordLettersList = document.querySelector('.js-main-word-letters-list');

    let result = '';

    if (lvl > 1) {
        findWordsCountNumber.innerHTML = 0;
        findWordsList.innerHTML = '';
        lvlCount.innerHTML = lvl;
    }

    for (let i = 0; i < mainWordLetters.length; i++) {
        result += `<li class="main-word-letters__item js-word-letters" data-word-id="${i + 1}">${mainWordLetters[i]}</li>`;
    }

    mainWordLettersList.innerHTML = result;

    wordConstructor(lvl, wordsDatabase[`lvl_${lvl}`]);
}

export default createLvl;