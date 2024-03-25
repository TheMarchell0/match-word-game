import createLvl from "./createLvl.js";
import goldCountChange from "./helpers/goldCountChange.js";
import finishGame from "./finishGame.js";
import createCookie from "./helpers/createCookie.js";
import filterFindWords from "./helpers/filterFindWords.js";

const cancelButton = document.querySelector('.js-cancel-button'),
    easterEgg = document.querySelector('.js-easter-egg'),
    helperShowLetter = document.querySelector('.js-helper-show-letter'),
    helperShowLettersLength = document.querySelector('.js-helper-show-letters-length'),
    helperShowFullWord = document.querySelector('.js-helper-show-full-word');

function wordConstructor(lvl, lvlInfo) {
    const findWordsList = document.querySelector('.js-find-words-list'),
        findWordsCountNumber = document.querySelector('.js-find-words-count'),
        wordConstructorField = document.querySelector('.js-word-constructor');

    let findWordsCount = 0,
        searchWordsFilter = lvlInfo['searchWords'],
        selectWordsArr = [],
        findWordsArr = [];

    const wordButtons = document.querySelectorAll('.js-word-letters')

    for (let wordButton of wordButtons) {
        wordButton.addEventListener('click', () => {
            cancelButton.classList.remove('disable');
            const text = wordButton.innerText;
            searchWordsFilter = searchWordsFilter.filter(item => item.includes(wordConstructorField.innerHTML.toLowerCase()));
            wordConstructorField.innerHTML += text;
            selectWordsArr.push(wordButton.getAttribute('data-word-id'));
            wordButton.classList.add('disable');
            filterFindWords(lvlInfo['searchWords']);

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
                    findWordsArr.push(wordConstructorField.innerHTML);
                    createCookie('find-words', findWordsArr.join(', '));
                    createCookie('words-count', findWordsCountNumber.innerHTML)
                    cancelButton.classList.add('disable');
                }

                for (let wordButton of wordButtons) {
                    wordButton.classList.remove('disable');
                }

                searchWordsFilter = lvlInfo['searchWords'];
                wordConstructorField.innerHTML = '';

                if (findWordsCount === lvlInfo['searchWords'].length) {
                   if (lvl === 5) {
                       finishGame();
                   }
                   else {
                       createLvl(++lvl);
                       selectWordsArr = [];
                       findWordsArr = [];
                       cancelButton.classList.add('disable');
                       createCookie('find-words', null);
                       createCookie('words-count', '0');
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
        }
    })

    helperShowLetter.addEventListener('click', ()=> {
        console.log(1)
    })

    helperShowLettersLength.addEventListener('click', ()=> {
        console.log(2)
    })

    helperShowFullWord.addEventListener('click', ()=> {
        console.log(3)
    })
}


export default wordConstructor;