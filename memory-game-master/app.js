
const cardArray = [
  {
    name: "card1",
    img: "images/card1.png",
  },
  {
    name: "card2",
    img: "images/card2.png",
  },
  {
    name: "card3",
    img: "images/card3.png",
  },
  {
    name: "card4",
    img: "images/card4.png",
  },
  {
    name: "card5",
    img: "images/card5.png",
  },
  {
    name: "card6",
    img: "images/card6.png",
  },
  {
    name: "card1",
    img: "images/card1.png",
  },
  {
    name: "card2",
    img: "images/card2.png",
  },
  {
    name: "card3",
    img: "images/card3.png",
  },
  {
    name: "card4",
    img: "images/card4.png",
  },
  {
    name: "card5",
    img: "images/card5.png",
  },
  {
    name: "card6",
    img: "images/card6.png",
  },
];

cardArray.sort(() => 0.5 - Math.random());

const grid = document.querySelector(".grid");
const resultDisplay = document.querySelector("#result");

let cardsChosen = [];
let cardsChosenId = [];
let cardsWon = [];

function createBoard() {
  for (let i = 0; i < cardArray.length; i++) {
    const card = document.createElement("img");
    card.setAttribute("src", "images/blank.png");
    card.setAttribute("data-id", i);
    card.addEventListener("click", flipCard);
    grid.appendChild(card);
  }
}

function checkForMatch() {
  const cards = document.querySelectorAll("img");
  const optionOneId = cardsChosenId[0];
  const optionTwoId = cardsChosenId[1];

  if (optionOneId == optionTwoId) {
    cards[optionOneId].setAttribute("src", "images/blank.png");
    cards[optionTwoId].setAttribute("src", "images/blank.png");
    // alert("You have clicked the same image!");
  } else if (cardsChosen[0] === cardsChosen[1]) {
    // alert("You found a match");
    cards[optionOneId].setAttribute("src", "images/white.png");
    cards[optionTwoId].setAttribute("src", "images/white.png");
    cards[optionOneId].removeEventListener("click", flipCard);
    cards[optionTwoId].removeEventListener("click", flipCard);
    cardsWon.push(cardsChosen);
  } else {
    cards[optionOneId].setAttribute("src", "images/blank.png");
    cards[optionTwoId].setAttribute("src", "images/blank.png");
    // alert("Sorry, try again");
  }
  cardsChosen = [];
  cardsChosenId = [];

  resultDisplay.textContent = "現在" + cardsWon.length + "／6ペア";
  if (cardsWon.length === cardArray.length / 2) {
    resultDisplay.textContent = "フィニッシュ!";
  }
}


function flipCard() {
  let cardId = this.getAttribute("data-id");
  cardsChosen.push(cardArray[cardId].name);
  cardsChosenId.push(cardId);
  this.setAttribute("src", cardArray[cardId].img);
  if (cardsChosen.length === 2) {
    setTimeout(checkForMatch, 500);
  }
}

createBoard();
