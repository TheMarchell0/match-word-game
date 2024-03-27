const helperShowLetter = document.querySelector('.js-helper-show-letter'),
    helperShowLettersLength = document.querySelector('.js-helper-show-letters-length'),
    helperShowFullWord = document.querySelector('.js-helper-show-full-word');

function changeHelpersStatus(status) {
    if (status === 'disable') {
        helperShowLetter.classList.add('disable');
        helperShowLettersLength.classList.add('disable');
        helperShowFullWord.classList.add('disable');
    } else {
        helperShowLetter.classList.remove('disable');
        helperShowLettersLength.classList.remove('disable');
        helperShowFullWord.classList.remove('disable');
    }
}

export default changeHelpersStatus;