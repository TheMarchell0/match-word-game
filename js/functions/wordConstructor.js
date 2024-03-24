import createLvl from "./createLvl.js";
import goldCountChange from "./helpers/goldCountChange.js";

const cancelButton = document.querySelector('.js-cancel-button'),
    easterEgg = document.querySelector('.js-easter-egg');

function wordConstructor(lvl, lvlInfo) {
    const findWordsList = document.querySelector('.js-find-words-list'),
        findWordsCountNumber = document.querySelector('.js-find-words-count'),
        wordConstructorField = document.querySelector('.js-word-constructor');

    let findWordsCount = 0,
        searchWordsFilter = lvlInfo['searchWords'],
        selectWordsArr = [];

    const wordButtons = document.querySelectorAll('.js-word-letters')

    for (let wordButton of wordButtons) {
        wordButton.addEventListener('click', () => {
            cancelButton.classList.remove('disable');
            const text = wordButton.innerText;
            searchWordsFilter = searchWordsFilter.filter(item => item.includes(text.toLowerCase()));
            wordConstructorField.innerHTML += text;
            selectWordsArr.push(wordButton.getAttribute('data-word-id'));
            wordButton.classList.add('disable');

            if (wordConstructorField.innerHTML.toLowerCase() == lvlInfo['mainWord']) {
                easterEgg.classList.remove('disable');
                setTimeout(()=> easterEgg.classList.add('disable'), 2000)
            }

            if (searchWordsFilter[0] === wordConstructorField.innerHTML.toLowerCase()) {
                const repeatCheck = document.querySelector(`.find-words-list__item[data-word="${wordConstructorField.innerHTML}"]`);

                if (repeatCheck) {
                    repeatCheck.classList.add('notice');
                    setTimeout(() => repeatCheck.classList.remove('notice'), 1000)
                } else {
                    findWordsList.innerHTML += `<li class="find-words-list__item" data-word="${wordConstructorField.innerHTML}">${wordConstructorField.innerHTML}</li>`;
                    goldCountChange('increase');
                    findWordsCountNumber.innerHTML = ++findWordsCount;
                    cancelButton.classList.add('disable');
                }

                for (let wordButton of wordButtons) {
                    wordButton.classList.remove('disable');
                }

                searchWordsFilter = lvlInfo['searchWords'];
                wordConstructorField.innerHTML = '';

                if (findWordsCount === lvlInfo['searchWords'].length) {
                    createLvl(++lvl);
                    selectWordsArr = [];
                    cancelButton.classList.add('disable');
                }
            }
        })
    }

    cancelButton.addEventListener('click', () => {
        const selectId = selectWordsArr.pop(),
            lastWord = document.querySelector(`.js-word-letters[data-word-id="${selectId}"]`);

        if (lastWord) {
            lastWord.classList.remove('disable');
            wordConstructorField.innerHTML = wordConstructorField.innerHTML.slice(0, -1);
        }

        if (wordConstructorField.innerHTML.length === 0) {
            cancelButton.classList.add('disable');
            searchWordsFilter = lvlInfo['searchWords'];
        }
    })
}


export default wordConstructor;