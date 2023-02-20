// Jquery Selectors
var welcome = document.querySelector("#welcome");
var startButton = document.querySelector(".start-button");
var timeEl = document.querySelector(".time-counter");
var quizContainer = document.querySelector(".quiz-container");
var quizQuestions = document.querySelector(".quiz-question");
var answerContainer = document.querySelector(".answer-container");
var quizOverEl = document.querySelector("#quiz-over");
var nameEl = document.querySelector("#save-name");
var inputEl = document.querySelector("#input");
var quizScoreEl = document.querySelector(".quiz-scores");
var backButton = document.querySelector(".back-button");
var quizScoresPage = document.querySelector(".quiz-scores-page");

// Variables For Time & Score
var timerCount;
var timeRemaining = 60;
var questionIndex = 0;
var quizscoresArray = JSON.parse(localStorage.getItem("high scores")) || [];

// Questions Stored In Arrays
var quiz = [
  {
    question: "What does HTML stand for?",
    choices: [
      "A. Hyper Text Machine Language",
      "B. Hyper Text Markup Language",
      "C. Hard Technical Markup Launcher",
      "D. Hyper Technical Machine Launcher",
    ],
    answer: "B. Hyper Text Markup Language",
  },
  {
    question: "What symbols are used to comment on javascript?",
    choices: [
      "A. //",
      "B. /* */",
      "C. # #",
      "D. <!-- -->",
    ],
    answer: "A. //",
  },
  {
    question: "How would you link a .js file to a .html?",
    choices: [
      "A. <script href=",
      "B. <link href=",
      "C. <script src=",
      "D. <link href=",
    ],
    answer: "C. <script src=",
  },
  {
    question: "Which Page Would You Find A Query Selector On?",
    choices: [
      "A. HTML",
      "B. CSS",
      "C. READ.ME",
      "D. Javascript",
    ],
    answer: "D. Javascript",
  }
];

// Function Starts Timer, Hides Welcome Container, And Renders Questions.
function startQuiz() {
  countdown();
  welcome.setAttribute("class", "hidden");
  renderQuestion(questionIndex);
}

// Timer Function
var timeInterval;
function countdown() {
  timeInterval = setInterval(function () {
    timeRemaining--;
    timeEl.textContent = "Time left: " + timeRemaining;
    if (timeRemaining <= 0) {
      clearInterval(timeInterval);
      timeRemaining = 0;
      timeEl.innerHTML = "";
      endquiz();
      quizContainer.innerHTML = "";
    }
  }, 1000);
}

// Function Replaces String In Questions & Answers
function renderQuestion(questionIndex) {
  quizQuestions.textContent = quiz[questionIndex].question;
  quizContainer.appendChild(quizQuestions);

  answerContainer.innerHTML = "";
  for (var i = 0; i < quiz[questionIndex].choices.length; i++) {
    var answerButton = document.createElement("button");
    answerButton.classList.add("answer-button");
    answerButton.setAttribute("style", "border-radius: 10px");
    answerButton.textContent = quiz[questionIndex].choices[i];
    answerContainer.appendChild(answerButton);
    quizContainer.appendChild(answerContainer);
  }
}

// Function Verefies Correct Or Incorrect Answers
function verifyAnswer(event) {
  var elementClicked = event.target;

  if (elementClicked.matches("button"))
    var answerText = elementClicked.textContent;
// If Incorrect Then -10 To Timer/Score
  if (answerText === quiz[questionIndex].answer) {
  } else {
    timeRemaining -= 10;
  }
  questionIndex++;
  // If No Time Or No Questions Are Left Then End Game
  if (questionIndex > quiz.length - 1) {
    quizContainer.setAttribute("class", "hidden");
    nameEl.classList.remove("hidden");
    timeEl.setAttribute("class", "hidden");
    clearInterval(timeInterval);
    endquiz();
  } else {
    renderQuestion(questionIndex);
  }
}

// Function That Removes Hidden On Quiz Over Screen When The Quiz Is Over 
function endquiz() {
  quizOverEl.classList.remove("hidden");
// Function That Generates Score Based of Time Remaining
  var finalScoreEl = document.querySelector("#final-score");
  finalScoreEl.textContent = " " + timeRemaining;
}
quizOverEl.classList.add("hidden");

// Function That Saves Name & Score on Score Page
function saveScore(event) {
  quizScoresPage.classList.remove("hidden");
  nameEl.classList.add("hidden");
  event.preventDefault();
  var initials = inputEl.value;
  var userScore = {
    score: timeRemaining,
    initials: initials,
  };

  quizscoresArray.push(userScore);
  // Saves Name & Score To Local Storage
  localStorage.setItem("high scores", JSON.stringify(quizscoresArray));

  for (var i = 0; i < quizscoresArray.length; i++) {
    var scoresList = document.createElement("p");
    scoresList.textContent =
      quizscoresArray[i].initials + ": " + quizscoresArray[i].score;
    quizOverEl.append(scoresList);
  }
}

// Function That Resets Quiz & Applies hidden classes on Various Divs
function restartQuiz(){
quizOverEl.classList.add("hidden");
welcome.classList.remove("hidden");
quizScoreEl.classList.add("hidden");
quizScoresPage.classList.add("hidden");
}

// Add Event Listeners For Start, Check Answers, Score Saving, & Resseting The Quiz
startButton.addEventListener("click", startQuiz);
answerContainer.addEventListener("click", verifyAnswer);
nameEl.addEventListener("submit", saveScore);
backButton.addEventListener("click", restartQuiz);