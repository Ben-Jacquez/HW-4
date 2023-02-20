//
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
var highScoresPage = document.querySelector(".high-scores-page");

// 
var timerCount;
var questionIndex = 0;
var timeLeft = 60;
var scoresArray = JSON.parse(localStorage.getItem("high scores")) || [];

//
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
];

//
function startQuiz() {
  countdown();
  welcome.setAttribute("class", "hidden");
  renderQuestion(questionIndex);
}

// 
var timeInterval;
function countdown() {
  timeInterval = setInterval(function () {
    timeLeft--;
    timeEl.textContent = "Time left: " + timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timeInterval);
      timeLeft = 0;
      timeEl.innerHTML = "";
      endgame();
      quizContainer.innerHTML = "";
    }
  }, 1000);
}

function renderQuestion(questionIndex) {
  quizQuestions.textContent = quiz[questionIndex].question;
  quizContainer.appendChild(quizQuestions);

  answerContainer.innerHTML = "";
  for (var i = 0; i < quiz[questionIndex].choices.length; i++) {
    var answerButton = document.createElement("button");
    answerButton.classList.add("answer-button");
    answerButton.setAttribute("style", "border-radius: 8px");
    answerButton.textContent = quiz[questionIndex].choices[i];
    answerContainer.appendChild(answerButton);
    quizContainer.appendChild(answerContainer);
  }
}

function checkAnswer(event) {
  var elementClicked = event.target;

  if (elementClicked.matches("button"))
    var answerText = elementClicked.textContent;

  if (answerText === quiz[questionIndex].answer) {
  } else {
    timeLeft -= 10;
  }
  questionIndex++;
  if (questionIndex > quiz.length - 1) {
    quizContainer.setAttribute("class", "hidden");
    nameEl.classList.remove("hidden");
    timeEl.setAttribute("class", "hidden");
    clearInterval(timeInterval);
    endgame();
  } else {
    renderQuestion(questionIndex);
  }
}

//
function endgame() {
  quizOverEl.classList.remove("hidden");

  var finalScoreEl = document.querySelector("#final-score");
  finalScoreEl.textContent = " " + timeLeft;
}
quizOverEl.classList.add("hidden");

function saveScore(event) {
  highScoresPage.classList.remove("hidden");
  nameEl.classList.add("hidden");
  event.preventDefault();
  var initials = inputEl.value;
  var newScore = {
    score: timeLeft,
    initials: initials,
  };

  scoresArray.push(newScore);

  localStorage.setItem("high scores", JSON.stringify(scoresArray));

  for (var i = 0; i < scoresArray.length; i++) {
    var scoresList = document.createElement("p");
    scoresList.textContent =
      scoresArray[i].initials + ": " + scoresArray[i].score;
    quizOverEl.append(scoresList);
  }
}

// 
function showScoresHideWelcome (){
  highScoresPage.classList.remove("hidden");
  welcome.setAttribute("class", "hidden");
  quizScoreEl.classList.remove("hidden");
  quizScoreEl.innerHTML = "<h2>Scores List</h2>";
  for (var i = 0; i < scoresArray.length; i++) {
    var scoresList = document.createElement("p");
    scoresList.textContent =
      scoresArray[i].initials + ": " + scoresArray[i].score;
      quizScoreEl.append(scoresList);
  
  }
}

// 
function resetQuiz(){
quizOverEl.classList.add("hidden");
welcome.classList.remove("hidden");
quizScoreEl.classList.add("hidden");
highScoresPage.classList.add("hidden");
}

// 
startButton.addEventListener("click", startQuiz);
answerContainer.addEventListener("click", checkAnswer);
nameEl.addEventListener("submit", saveScore);
backButton.addEventListener("click", resetQuiz);