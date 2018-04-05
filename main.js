const CARDNUMBER = 18;
 
const scoreBlock = document.getElementById('score');
let all_cards;
let cards;
let openCardID;
let score;
let canPlay;
let cardsLeft;
let score1;
 
function cardsRandom(a, b) {
    return Math.random() - 0.5;
}
 
function updateScore() {
    scoreBlock.innerText = score;
}
 
function setImg(cardID, imgName) {
    document.getElementById('card-img-' + cardID).src = './imgs/cards/' + imgName + '.png';
    document.getElementById('card-img-' + cardID).setAttribute('data-tid', 'Card');
}
 
function setBack(cardID) {
    setImg(cardID, 'back');
    document.getElementById('card-img-' + cardID).setAttribute('data-tid', 'Card-flipped');
}
 
function openAll() {
    for(let i = 1; i <= CARDNUMBER; i++) {
        setImg(i, cards[i]);
    }
}
 
function setAllBack() {
    for(let i = 1; i <= CARDNUMBER; i++) {
        setBack(i);
    } 
}
 
function showPage(pageID) {
    for(let i = 1; i <= 3; i++) {
        if (i === pageID) {
            document.getElementById('page' + i).style.display = 'block';
        } else {
            document.getElementById('page' + i).style.display = 'none';
        }
    }
}
 
function check(card1ID, card2ID) {
    if (cards[card1ID] == cards[card2ID]) {
        document.getElementById('card-' + card1ID).style.visibility = 'hidden';
        document.getElementById('card-' + card2ID).style.visibility = 'hidden';
        score += cardsLeft * 21;
        cardsLeft -= 2;
        if (!cardsLeft) {
            document.getElementById('final-score').innerText = score;
            showPage(3);
        }
    } else {
        score -= (9 - cardsLeft/2)*42;
    }
}
 
function start() {
    all_cards = ['3C','5C','7C','9C','JC','QC','3D','5D','7D','9D','JD','QD','3H','5H','7H','9H','JH','QH','3S','5S','7S','9S','JS','QS','2C','4C','6C','8C','AC','KC','2D','4D','6D','8D','AD','KD','2H','4H','6H','8H','AH','KH','2S','4S','6S','8S','AS','KS','0C','0D','0H','0S'] ;
    cards = [];
    openCardID = -1;
    score = 0;
   
    all_cards.sort(cardsRandom);
    for (let i = 0; 2 * i < CARDNUMBER; i++) {
        for(let j = 0; j < 2; j++) {
            cards.push(all_cards[i]);
        }
    }
    for(let i = 1; i <= CARDNUMBER; i++) {
        document.getElementById('card-' + i).style.visibility = 'visible';
    }
    cards.sort(cardsRandom);
    cards.unshift(null);
    updateScore();
    openAll();
    canPlay = false;
    cardsLeft = CARDNUMBER;
    setTimeout(() => {
        setAllBack();
        canPlay = true;
    }, 5000);
 
}
 
for(let i = 1; i <= CARDNUMBER; i++) {
    const card = document.getElementById('card-' + i);
    card.onclick = () => {
        if (!canPlay || openCardID === i) {
            return;
        }
        if (openCardID === -1) {
            setAllBack();
            openCardID = i;
        } else {
            check(i, openCardID);
            openCardID = -1;
        }
        setImg(i, cards[i]);
        updateScore();
    }
}
 
showPage(1);
document.getElementById('button__game__start').onclick = () => {
    showPage(2);
    start();
}
document.getElementById('play-again').onclick = () => {
    showPage(2);
    start();
}
document.getElementById('restart').onclick = () => {
    if (canPlay) {
        start();
    }
}
