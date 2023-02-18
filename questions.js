var currentQuestion = 0;
const playerName = document.getElementById('name');
const url = "http://127.0.0.1:5000/score";
var questions = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "London", "Berlin"],
    answer: "Paris",
  },
  {
    question: "What is the largest ocean in the world?",
    options: ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean"],
    answer: "Pacific Ocean",
  },
  {
    question: "What is the largest ocean the world?",
    options: ["Atlantic Oan", "Indian Oan", "Pific Ocean"],
    answer: "Pific Ocean",
  },
  // Add more questions here
];

function showQuestion() {
  var questionObj = questions[currentQuestion];
  var questionEl = document.getElementById("question");
  var option1El = document.getElementById("option1");
  var option2El = document.getElementById("option2");
  var option3El = document.getElementById("option3");
  questionEl.textContent = questionObj.question;
  option1El.textContent = questionObj.options[0];
  option2El.textContent = questionObj.options[1];
  option3El.textContent = questionObj.options[2];
}

showQuestion(); // Call this when the quiz is first loaded

function sendScoreToServer() {
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `name=${playerName}&score=${playerScore}`,
  })
    .then((response) => response.text())
    .then((data) => console.log(data))
    .catch((error) => console.error(error));
}

function checkAnswer() {
  var answer = document.querySelector('input[name="answer"]:checked');
  if (answer === null || answer === undefined) {
    alert("Please select an answer.");
    return;
  }
  var answerValue = answer.value.trim();
  var questionObj = questions[currentQuestion];
  if (answerValue === questionObj.answer.trim()) {
    playerScore += 2;
  }
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    showQuestion();
  } else {
    sendScoreToServer(playerName, playerScore);
  }
}
