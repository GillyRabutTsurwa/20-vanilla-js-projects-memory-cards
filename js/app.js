const DOM = (function () {
  const elements = {
    cardsContainer: document.getElementById("cards-container"),
    prevBtn: document.getElementById("prev"),
    nextBtn: document.getElementById("next"),
    currentEl: document.getElementById("current"),
    showBtn: document.getElementById("show"),
    hideBtn: document.getElementById("hide"),
    questionEl: document.getElementById("question"),
    answerEl: document.getElementById("answer"),
    addCardBtn: document.getElementById("add-card"),
    clearBtn: document.getElementById("clear"),
    addContainer: document.getElementById("add-container"),
  };
  return elements;
})();

// traquer la carte actuelle
let currentActiveCard = 0;

// ce tableau est pour garder les cartes dans le DOM
const cardsEl = [];

// garder les données des cartes. Ces données seront utiliser pour créer les cartes que l'on va mettre au DOM grace au cardsEl.
const cardsData = [
  {
    question: "Puis-je utiliser les boutons dessous pour naviguer les cartes ?",
    answer: "Non, pas encore",
  },
  {
    question: "What must a variable begin with?",
    answer: "A letter, $ or _",
  },
  {
    question: "What is a variable?",
    answer: "A container for a piece of data",
  },
  {
    question: "Example of a case sensitive variable?",
    answer: "thisIsAVariable",
  },
];

/**
 * This function is used to show the number of card out of total number of cards.
 */
function updateCurrentText() {
  DOM.currentEl.innerText = `${currentActiveCard + 1}/${cardsEl.length}`;
}

/**
 * This function creates a single card in the DOM.
 * @param {*} dataObj
 * @param {*} index
 */
function createSingleCard(dataObj, index) {
  // recreating the card first by creating a div
  const card = document.createElement("div");
  // ... and giving it the card class
  card.classList.add("card");

  // if the index of the card is 0 (ie, if it is the first card). This logic will show the first card.
  if (index === 0) {
    // give it the active class
    card.classList.add("active");
  }

  // inject the innerHTML into the just-created card div.
  card.innerHTML = `
  <div class="inner__card">
      <div class="inner__card--front">
        <p>
          ${dataObj.question}
        </p>
        <i id="delete-card" class="fas fa-trash"></i>
      </div>
      <div class="inner__card--back">
        <p>
          ${dataObj.answer}
        </p>
      </div>
  </div>
  `;

  // add a clickListener to the card....
  card.addEventListener("click", () => {
    // ....to toggle the show-answer class, which will flip the card
    card.classList.toggle("show-answer");
  });

  // after creating this card, we add it to our cardsElement array
  cardsEl.push(card);
  // inject this card to the cardscontainer
  DOM.cardsContainer.appendChild(card);

  updateCurrentText();
}

// Create all cards
function createCards() {
  // loop through the cards data array; our array of objects
  // upon each iteration, run the createSingleCard() passing in the object data and the index
  cardsData.forEach((currentCardData, index) => createSingleCard(currentCardData, index));
}

createCards();
