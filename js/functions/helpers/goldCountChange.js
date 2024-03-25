import createCookie from "./createCookie.js";
import getCookie from "./getCookie.js";

const goldCountWrapper = document.querySelector('.js-gold-count-wrapper'),
    goldCount = document.querySelector('.js-gold-count');

let goldIncreaseIterationCount = 0;

function goldCountChange(changeType) {
    let number = 0;
    switch (changeType) {
        case 'increase':
            number = 8;
            break;
        case 'decrease_first_letter':
            number = 3;
            break;
        case 'decrease_letter_count':
            number = 5;
            break;
        case 'decrease_max':
            number = 10;
            break;
        default:
            console.log('Неверный тип изменения');
    }

    goldCountWrapper.classList.add('active');

    setTimeout(() => goldCountWrapper.classList.remove('active'), 1500);

    changeIteration();

    function changeIteration() {
        if (goldIncreaseIterationCount < number) {
            setTimeout(() => {
                goldCount.innerHTML = changeType === 'increase' ? parseInt(goldCount.innerHTML) + 1 : goldCount.innerHTML - 1;
                goldIncreaseIterationCount++;
                changeIteration();
            }, 80);
        } else {
            goldIncreaseIterationCount = 0
            createCookie('golds-count',goldCount.innerHTML)
        }
    }
}

export default goldCountChange;