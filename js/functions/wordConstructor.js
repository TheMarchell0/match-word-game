import createLvl from "./createLvl.js";

const goldCountWrapper = document.querySelector('.js-gold-count-wrapper'),
    goldCount = document.querySelector('.js-gold-count'),
    cancelButton = document.querySelector('.js-cancel-button');

let goldIncreaseIterationCount = 0;

function wordConstructor(lvl, searchWords) {
    const findWordsList = document.querySelector('.js-find-words-list'),
        findWordsCountNumber = document.querySelector('.js-find-words-count'),
        wordConstructorField = document.querySelector('.js-word-constructor');

    let findWordsCount = 0,
        searchWordsFilter = searchWords,
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
            if (searchWordsFilter[0] === wordConstructorField.innerHTML.toLowerCase()) {
                const repeatCheck = document.querySelector(`.find-words-list__item[data-word="${wordConstructorField.innerHTML}"]`);

                if (repeatCheck) {
                    repeatCheck.classList.add('notice');
                    setTimeout(() => repeatCheck.classList.remove('notice'), 1000)
                } else {
                    findWordsList.innerHTML += `<li class="find-words-list__item" data-word="${wordConstructorField.innerHTML}">${wordConstructorField.innerHTML}</li>`;
                    goldCountIncrease()
                    findWordsCountNumber.innerHTML = ++findWordsCount;
                }

                for (let wordButton of wordButtons) {
                    wordButton.classList.remove('disable');
                }

                searchWordsFilter = searchWords;
                wordConstructorField.innerHTML = '';

                if (findWordsCount === searchWords.length) {
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
            searchWordsFilter = searchWords;
        }
    })
}

function goldCountIncrease() {
    goldCountWrapper.classList.add('active');

    setTimeout(() => goldCountWrapper.classList.remove('active'), 2000);

    if (goldIncreaseIterationCount < 3) {
        setTimeout(() => {
            goldCount.innerHTML = parseInt(goldCount.innerHTML) + 1;
            goldIncreaseIterationCount++;
            goldCountIncrease();
        }, 100);
    }
}


export default wordConstructor;