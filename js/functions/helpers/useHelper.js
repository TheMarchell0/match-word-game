function useHelper(selector, word) {
    const field = document.querySelector(`.${selector}`);
    let result = null;

    switch (selector) {
        case 'js-helper-show-letter-text':
            result = word[0].toUpperCase();
            break;
        case 'js-helper-show-letters-length-text':
            result = word.length;
            break;
        case 'js-helper-show-full-word-text':
            result = word.toUpperCase();
            break;
        default:
            console.log('Неверный тип изменения');
    }

    field.innerHTML = result;
    field.classList.add('active');
    setTimeout(()=> field.classList.remove('active'), 3000)
}

export default useHelper;