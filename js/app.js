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
    //NEW:
    innerCard: document.querySelector(".inner__card"),
  };
  return elements;
})();

let currentActiveCard = 0;

const cardsEl = [];

const cardsData = [
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

function updateCurrentText() {
  DOM.currentEl.innerText = `${currentActiveCard + 1}/${cardsEl.length}`;
}

function createSingleCard(dataObj, index) {
  // recreating the card first by creating a div
  const card = document.createElement("div");
  // ... and giving it the card class
  card.classList.add("card");

  // if the index of the card is 0 (ie, if it is the first card)
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

  // add a clickListener to the card
  card.addEventListener("click", () => {
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

DOM.nextBtn.addEventListener("click", () => {
  cardsEl[currentActiveCard].className = "card left";
  currentActiveCard = currentActiveCard + 1;

  if (currentActiveCard > cardsEl.length - 1) {
    currentActiveCard = cardsEl.length - 1;
  }

  cardsEl[currentActiveCard].className = "card active";
  // console.log(currentActiveCard);

  updateCurrentText();
});

DOM.prevBtn.addEventListener("click", () => {
  cardsEl[currentActiveCard].className = "card right";
  currentActiveCard = currentActiveCard - 1;

  if (currentActiveCard < 0) {
    currentActiveCard = 0;
  }

  cardsEl[currentActiveCard].className = "card active";
  console.log(currentActiveCard);

  updateCurrentText();
});

// show add container
DOM.showBtn.addEventListener("click", () => {
  DOM.addContainer.classList.add("show");
});

// hide container
DOM.hideBtn.addEventListener("click", () => {
  DOM.addContainer.classList.remove("show");
});

// add new card
DOM.addCardBtn.addEventListener("click", () => {
  const question = DOM.questionEl.value;
  const answer = DOM.answerEl.value;

  if (question.trim() && answer.trim()) {
    const newCard = {
      question: question,
      answer: answer,
    };
    createSingleCard(newCard);
    DOM.questionEl.value = "";
    DOM.answerEl.value = "";

    DOM.addContainer.classList.remove("show");
    cardsData.push(newCard);
    console.log(cardsData);
  }
});

//TESTING:
//FAIL:
console.log(cardsEl);
cardsEl.forEach((currentCard, index) => {
  let idx = index;
  currentCard.addEventListener("click", (e) => {
    if (e.target.id === "delete-card") {
      currentCard.classList.remove("show-answer");
      console.log(`Clicked the trash bin of card # ${idx}`);

      // filter code a suivre
    }
  });
});
