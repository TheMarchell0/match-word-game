import createLvl from "./createLvl.js";
import goldCountChange from "./helpers/goldCountChange.js";
import finishGame from "./finishGame.js";
import filterFindWords from "./helpers/filterFindWords.js";
import useHelper from "./helpers/useHelper.js";
import changeHelpersStatus from "./helpers/changeHelpersStatus.js";

const cancelButton = document.querySelector('.js-cancel-button'),
    easterEgg = document.querySelector('.js-easter-egg'),
    helperShowLetter = document.querySelector('.js-helper-show-letter'),
    helperShowLettersLength = document.querySelector('.js-helper-show-letters-length'),
    helperShowFullWord = document.querySelector('.js-helper-show-full-word'),
    cheatBlock = document.querySelector('.js-cheats'),
    cheatsStatus = document.querySelector('.js-cheats-status'),
    goldsVisual = document.querySelectorAll('.js-gold-view');

function wordConstructor(lvl, lvlInfo) {
    const findWordsList = document.querySelector('.js-find-words-list'),
        findWordsCountNumber = document.querySelector('.js-find-words-count'),
        wordConstructorField = document.querySelector('.js-word-constructor');

    let findWordsCount = 0,
        searchWordsFilter = lvlInfo['searchWords'],
        selectWordsArr = [],
        findWordsArr = [],
        useFullWordHelper = false;

    const wordButtons = document.querySelectorAll('.js-word-letters')

    for (let wordButton of wordButtons) {
        wordButton.addEventListener('click', () => {
            cancelButton.classList.remove('disable');
            const text = wordButton.innerText;
            searchWordsFilter = lvlInfo['searchWords'].filter(item => item.includes(wordConstructorField.innerHTML.toLowerCase()));
            wordConstructorField.innerHTML += text;
            selectWordsArr.push(wordButton.getAttribute('data-word-id'));
            wordButton.classList.add('disable');
            changeHelpersStatus('disable')
            filterFindWords(lvlInfo['searchWords']);

            if (wordConstructorField.innerHTML.toLowerCase() == lvlInfo['mainWord']) {
                easterEgg.classList.remove('disable');
                setTimeout(() => easterEgg.classList.add('disable'), 2000)
            }

            if (searchWordsFilter[0] === wordConstructorField.innerHTML.toLowerCase()) {
                const repeatCheck = document.querySelector(`.find-words-list__item[data-word="${wordConstructorField.innerHTML}"]`);

                if (repeatCheck) {
                    repeatCheck.classList.add('notice');
                    setTimeout(() => repeatCheck.classList.remove('notice'), 1000)
                    changeHelpersStatus('enable')
                    cancelButton.classList.add('disable');
                } else {
                    findWordsList.innerHTML += `<li class="find-words-list__item" data-word="${wordConstructorField.innerHTML}">${wordConstructorField.innerHTML}</li>`;
                    if (!useFullWordHelper) {
                        goldCountChange('increase');
                    }
                    findWordsCountNumber.innerHTML = ++findWordsCount;
                    findWordsArr.push(wordConstructorField.innerHTML);
                    cancelButton.classList.add('disable');
                    changeHelpersStatus('enable')
                    if (useFullWordHelper) {
                        useFullWordHelper = false;
                    }
                }

                for (let wordButton of wordButtons) {
                    wordButton.classList.remove('disable');
                }

                searchWordsFilter = lvlInfo['searchWords'];
                wordConstructorField.innerHTML = '';

                if (findWordsCount === lvlInfo['searchWords'].length) {
                    if (lvl === 5) {
                        finishGame();
                    } else {
                        createLvl(++lvl);
                        selectWordsArr = [];
                        findWordsArr = [];
                        cancelButton.classList.add('disable');
                        useFullWordHelper = false;
                    }
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
            changeHelpersStatus('enable');
        }
    })

    helperShowLetter.addEventListener('click', () => {
        const notFoundWord = filterFindWords(lvlInfo['searchWords'])[0];
        if (goldCountChange('decrease_first_letter') !== 'not enough count') {
            useHelper('js-helper-show-letter-text', notFoundWord);
            helperShowLetter.classList.add('disable');
            setTimeout(() => {
                if (wordConstructorField.innerHTML.length === 0) {
                    helperShowLetter.classList.remove('disable')
                }
            }, 3000)
        }
    })

    helperShowLettersLength.addEventListener('click', () => {
        const notFoundWord = filterFindWords(lvlInfo['searchWords'])
        if (goldCountChange('decrease_letter_count') !== 'not enough count') {
            useHelper('js-helper-show-letters-length-text', notFoundWord);
            helperShowLettersLength.classList.add('disable');
            setTimeout(() => {
                if (wordConstructorField.innerHTML.length === 0) {
                    helperShowLettersLength.classList.remove('disable')
                }
            }, 3000)
        }
    })

    helperShowFullWord.addEventListener('click', () => {
        const notFoundWord = filterFindWords(lvlInfo['searchWords'])
        if (goldCountChange('decrease_max') !== 'not enough count') {
            useHelper('js-helper-show-full-word-text', notFoundWord);
            helperShowFullWord.classList.add('disable');
            setTimeout(() => {
                if (wordConstructorField.innerHTML.length === 0) {
                    helperShowFullWord.classList.remove('disable')
                }
            }, 3000)
            useFullWordHelper = true;
        }
    })
}

cheatBlock.addEventListener('click', ()=> {
    cheatBlock.classList.toggle('active');
    if (cheatBlock.classList.contains('active')) {
        cheatsStatus.innerHTML = 'Вкл';
    }

    else {
        cheatsStatus.innerHTML = 'Выкл';
    }
    for (let goldVisual of goldsVisual) {
        goldVisual.classList.toggle('hidden');
    }
})


export default wordConstructor;