function filterFindWords(searchWordList) {
    const findWordsList = document.querySelectorAll('.find-words-list__item');
    let notFoundWordsList = null;

    if (findWordsList.length > 0) {
        notFoundWordsList = searchWordList.filter(word => {
            return !Array.from(findWordsList).some(findWord => word === findWord.innerHTML.toLowerCase());
        });
        notFoundWordsList = notFoundWordsList[0];
    } else {
        notFoundWordsList = searchWordList[0];
    }

    return notFoundWordsList;
}

export default filterFindWords;