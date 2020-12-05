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
  const card = document.createElement("div");
  card.classList.add("card");

  if (index === 0) {
    card.classList.add("active");
  }

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

  card.addEventListener("click", () => {
    card.classList.toggle("show-answer");
  });

  cardsEl.push(card);
  DOM.cardsContainer.appendChild(card);

  updateCurrentText();
}

function createCards() {
  cardsData.forEach((currentCardData, index) => createSingleCard(currentCardData, index));
}

createCards();

//NEW:
DOM.nextBtn.addEventListener("click", () => {
  // the card that was the current card will be moved to the left
  cardsEl[currentActiveCard].className = "card left";
  // the index of the active card becomes the card that is next in the queue. Next becomes current, and current becomes past. Ecclesiastes tings.
  currentActiveCard = currentActiveCard + 1;

  // if we get to the end of our cards
  if (currentActiveCard > cardsEl.length - 1) {
    // the current card will stick to be the last card, no matter how many times we click.
    //IDEA: why don't we do a cycle? so it goes back to the first card? I'll test it in a later branch
    currentActiveCard = cardsEl.length - 1;
  }

  // the new current card (look at line 90 if it's still confusing) now gets the classes card and active
  cardsEl[currentActiveCard].className = "card active";
  console.log(currentActiveCard);

  updateCurrentText();
});

// Same exact code as the one above, but for clicking previous. Same thing but backwards.
//TODO: Refactor this into one function and call it twice accordingly
DOM.prevBtn.addEventListener("click", () => {
  cardsEl[currentActiveCard].className = "card right";
  currentActiveCard = currentActiveCard - 1;

  //IDEA: just as the one before, if we get to the first, let's try go all the way to the last card, so it's a cycle
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
    setCardsData(cardsData);
  }
});
