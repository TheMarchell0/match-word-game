const cancelButton = document.querySelector('.js-cancel-button'),
    goldCount = document.querySelector('.js-gold-count'),
    findWordsList = document.querySelector('.js-find-words-list'),
    selectWordsArr = [];
let wordConstructorField = document.querySelector('.js-word-constructor'),
    findWordsCount = 0;

function wordConstructor(searchWords) {
    let searchWordsFilter = searchWords;
    const wordButtons = document.querySelectorAll('.js-word-letters')
    for (let wordButton of wordButtons) {
        wordButton.addEventListener('click', () => {
            cancelButton.classList.remove('disable');
            const text = wordButton.innerText;
            searchWordsFilter = searchWordsFilter.filter(item => item.includes(text));
            wordConstructorField.innerHTML += text;
            selectWordsArr.push(wordButton.getAttribute('data-word-id'));
            wordButton.classList.add('disable');
            if (searchWordsFilter.length === 1 && searchWordsFilter[0] === wordConstructorField.innerHTML) {
                goldCount.innerHTML = parseInt(goldCount.innerHTML) + 10;
                ++findWordsCount;
                if (findWordsCount === searchWords.length) {
                    alert('finish')
                }
                for (let wordButton of wordButtons) {
                    wordButton.classList.remove('disable');
                    searchWordsFilter = searchWords;
                    findWordsList.innerHTML += `<li class="find-words-list__item">${wordConstructorField.innerHTML}</li>`;
                    wordConstructorField.innerHTML = '';
                }
            }
        })
    }

    cancelButton.addEventListener('click', () => {
        const selectId = selectWordsArr.pop();
        const lastWord = document.querySelector(`.js-word-letters[data-word-id="${selectId}"]`);
        lastWord.classList.remove('disable');
        wordConstructorField.innerHTML = wordConstructorField.innerHTML.slice(0, -1);

        if (wordConstructorField.innerHTML.length === 0) {
            cancelButton.classList.add('disable');
        }
    })
}

export default wordConstructor;