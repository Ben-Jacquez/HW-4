// Query Selectors
var quizEl = document.querySelector(".quiz");
var welcomeEl = document.querySelector("#welcome");
var startButton = document.querySelector(".start-button");
var timeEl = document.querySelector(".time-counter");
var quizContainer = document.querySelector(".quiz-container");
var questionEl = document.querySelector(".question");
var answerContainer = document.querySelector(".answer-container");
var endScreenEl = document.querySelector("#quiz-over");
var saveName= document.querySelector("#save-name");

// Timer and Score Variables
var timeCount;

// Questions
var questions = [
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
]

// Event Listeners
startButton.addEventListener("click", startQuiz);