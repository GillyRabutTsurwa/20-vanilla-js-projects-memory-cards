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
    //TODO: put delete single card funcitonality here
  });

  cardsEl.push(card);
  DOM.cardsContainer.appendChild(card);

  updateCurrentText();
}

function createCards() {
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
  console.log(currentActiveCard);

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

// NEW: show add container - the one with the form
DOM.showBtn.addEventListener("click", () => {
  DOM.addContainer.classList.add("show");
});

// NEW: hide container upon clicking the "x" button in the form
DOM.hideBtn.addEventListener("click", () => {
  DOM.addContainer.classList.remove("show");
});

// NEW: add new card
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
    // cardsData.push(newCard); i like spread better. i'm sorry i'm not sori
    cardsData = [...cardsData, newCard];
  }
});
