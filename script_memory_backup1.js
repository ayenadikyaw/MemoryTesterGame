let img1 = "url(./img/1.png)";
let img2 = "url(./img/2.png)";
let img3 = "url(./img/3.png)";
let img4 = "url(./img/4.png)";
let img5 = "url(./img/5.png)";
let img6 = "url(./img/6.png)";
let cards = document.getElementsByClassName("card");
let images = [
  img1,
  img1,
  img2,
  img2,
  img3,
  img3,
  img4,
  img4,
  img5,
  img5,
  img6,
  img6,
];
let noOfCards = 12;
let indexImg = [];
let isClickable = false;
let clickCount = 0;
let clickedCards = [];
let pairImg = [];
let moves = 0;
let misses = 0;
let playTime = 0;

/**
 * to locate the cards at random card positions
 * @returns card array
 */
const selectRandomCardsPos = () => {
  let indexNo = [];
  while (indexNo.length < noOfCards) {
    var randomIndex = Math.floor(Math.random() * cards.length);
    if (indexNo.includes(randomIndex)) {
      continue;
    } else {
      indexNo.push(randomIndex);
    }
  }
  return indexNo;
};

const setCardImgs = (indexes) => {
  for (let i = 0; i < indexes.length; i++) {
    cards[indexes[i]].style.backgroundImage = images[i];
    indexImg[indexes[i]] = images[i];
  }
};

const resetImages = () => {
  console.log("reset Images");
  for (let i = 0; i < cards.length; i++) {
    cards[i].style.backgroundImage = "";
  }
};

const reTurn = () => {
  console.log("reset Images");
  for (let i = 0; i < cards.length; i++) {
    cards[i].style.transform = "";
  }
};

let timeoutID;
const timer = (sec, callback) => {
  let count = sec;

  const countdown = () => {
    if (count >= 0) {
      document.getElementById("time").innerHTML = count + "s";
      count--;
      timeoutID = setTimeout(countdown, 1000); // Call the countdown function again after 1 second
    } else {
      callback(true); // Call the callback function with true when the timer completes
    }
  };

  // Start the countdown
  countdown();

  // Handle error case (e.g., if sec is not a valid number)
  if (isNaN(sec) || sec <= 0) {
    clearTimeout(timeoutID);
    callback(false); // Call the callback function with false
  }
};

function play(obj) {
  if (!isClickable) return;

  var cardID = Number(obj.id) - 1;
  if (!clickedCards.includes(cardID)) {
    pairImg.push(indexImg[cardID]);
    clickedCards.push(cardID);
    clickCount++;
    document.getElementById(obj.id).style.transform = "rotateY(180deg)";
    setTimeout(
      () => {
        document.getElementById(obj.id).style.backgroundImage =
          indexImg[cardID];},
      500
    );
  }
  
  if (clickCount == 2) {
    if (checkMatch()) {
      isClickable = false;
      hideCards(clickedCards);
      setTimeout(() => {isClickable = true;},1000);
      
    } else {
      isClickable = false;
      // If they don't match, turn back the cards
      setTimeout(() => {
        turnback(clickedCards);
        isClickable = true;
      }, 1000);
      misses++;
    }
    pairImg = [];
    //clickedCards = [];
    setTimeout(() => (clickedCards = []), 1200);
    clickCount = 0;
    moves++;
  }  
}

const checkMatch = () => {
  if (pairImg[0] === pairImg[1]) {
    console.log("yes");
    return true;
  }
  return false;
};

function turnback(pair) {
  var id1 = String(pair[0] + 1);
  var id2 = String(pair[1] + 1);
  console.log(id1, id2);
  // Reset transform for both cards to flip them back
  // Reset transform and background color for both cards to flip them back
  document.getElementById(id1).style.transform = "rotateY(0deg)";
  document.getElementById(id1).style.backgroundImage = "";
  document.getElementById(id2).style.transform = "rotateY(0deg)";
  document.getElementById(id2).style.backgroundImage = "";
}

function hideCards(pair) {
  console.log(pair);
  var id1 = String(pair[0] + 1);
  var id2 = String(pair[1] + 1);
  document.getElementById(id1).style.visibility = "hidden";
  document.getElementById(id2).style.visibility = "hidden";
  noOfCards -= 2;
}

function displayMessages() {
  document.getElementById("move").innerText = moves;
  document.getElementById("miss").innerText = misses;
}

let doneChoose = false;
function easyMode(obj) {
  var mode = obj.innerText;
  playTime = 35;
  document.getElementById("level").innerText = "Easy";
  closeModes();
}

function mediumMode(obj) {
  var mode = obj.innerText;
  playTime = 25;
  document.getElementById("level").innerText = "Midium";
  closeModes();
}

function difficultMode(obj) {
  var mode = obj.innerText;
  playTime = 15;
  document.getElementById("level").innerText = "Difficult";
  closeModes();
}

function closeModes() {
  doneChoose = true;
  document.getElementById("easy").disabled = true;
  document.getElementById("easy").style.backgroundColor = "gray";
  document.getElementById("medium").disabled = true;
  document.getElementById("medium").style.backgroundColor = "gray";
  document.getElementById("difficult").disabled = true;
  document.getElementById("difficult").style.backgroundColor = "gray";
}

function openModes() {
  doneChoose = false;
  document.getElementById("easy").disabled = false;
  document.getElementById("easy").style.backgroundColor = "rgb(195, 74, 94)";
  document.getElementById("medium").disabled = false;
  document.getElementById("medium").style.backgroundColor = "rgb(195, 74, 94)";
  document.getElementById("difficult").disabled = false;
  document.getElementById("difficult").style.backgroundColor =
    "rgb(195, 74, 94)";
}

function initialize() {
  const choosenMode = doneChoose ? true : false;
  if (choosenMode) {
    document.getElementById("start").disabled = true;
    document.getElementById("start").style.backgroundColor = "gray";
    const cardIndexes = selectRandomCardsPos();
    setCardImgs(cardIndexes);
    //setTimeout(resetColors,3000);// Set up the first timer
    setTimeout(() => {
      resetImages(); // Reset colors after 3000ms
      setTimeout(() => {
        isClickable = true;
        timer(playTime, (timesUp) => {
          if (timesUp) {
            alert("TimesUp");
            isClickable = false;
            const result = noOfCards > 0 ? false : true;
            if (result) {
              displayWin();
            } else {
              displaylose();
            }
            displayMessages();
          }
        });
      }, 100);
    }, 3000);
  } else {
    alert("Choose mode first");
  }
}

function displayWin() {
  document.getElementById("winStatus").innerText = "You win the game!";
}

function displaylose() {
  document.getElementById("winStatus").innerText = "You lose the game!";
}

function restart() {
  document.getElementById("start").disabled = false;
  document.getElementById("start").style.backgroundColor = "rgb(195, 74, 94)";
  clearTimeout(timeoutID); // Clear the timeout to stop the countdown
  document.getElementById("time").innerHTML = "0s";
  document.getElementById("level").innerText = "None";
  openModes();
  misses = 0;
  moves = 0;
  displayMessages();
  cardsArray = Array.from(cards);
  cardsArray.forEach((card) => {
    card.style.visibility = "visible";
  });
  setTimeout(resetImages, 1000);
  setTimeout(reTurn, 1000);
  playCnt = 0;
  pairImg = [];
  clickedCards = [];
  clickCount = 0;
  noOfCards = 12;
  var ind = selectRandomCardsPos();
  setCardImgs(ind);
  document.getElementById("winStatus").innerText = "";
}
