const goldCountWrapper = document.querySelector('.js-gold-count-wrapper'),
    goldCount = document.querySelector('.js-gold-count');

let goldIncreaseIterationCount = 0;

function goldCountChange(changeType) {
    const cheatBlock = document.querySelector('.js-cheats');
    if (!cheatBlock.classList.contains('active')) {
        let type = '';
        let number = 0;
        switch (changeType) {
            case 'increase':
                type = 'increase';
                number = 10;
                break;
            case 'decrease_first_letter':
                type = 'decrease';
                number = 3;
                break;
            case 'decrease_letter_count':
                type = 'decrease';
                number = 5;
                break;
            case 'decrease_max':
                type = 'decrease';
                number = 10;
                break;
            default:
                console.log('Неверный тип изменения');
        }

        if (goldCount.innerHTML - number <= -1 && type === 'decrease') {
            if (!goldCountWrapper.classList.contains('error')) {
                goldCountWrapper.classList.add('error');
                setTimeout(()=> goldCountWrapper.classList.remove('error'), 3000);
            }
            return 'not enough count'
        }

        else {
            goldCountWrapper.classList.add('active');

            setTimeout(() => goldCountWrapper.classList.remove('active'), 3000);

            changeIteration();
        }

        function changeIteration() {
            if (goldIncreaseIterationCount < number) {
                setTimeout(() => {
                    goldCount.innerHTML = changeType === 'increase' ? parseInt(goldCount.innerHTML) + 1 : goldCount.innerHTML - 1;
                    goldIncreaseIterationCount++;
                    changeIteration();
                }, 80);
            } else {
                goldIncreaseIterationCount = 0;
            }
        }
    }
}

export default goldCountChange;