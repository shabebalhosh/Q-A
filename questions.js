const urlParams = new URLSearchParams(window.location.search);
const name = urlParams.get("name");

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  get,
  child,
  update,
} from "https://www.gstatic.com/firebasejs/9.6.11/firebase-database.js";
const firebaseConfig = {
  apiKey: "AIzaSyArDynFiDleYc0pw5vOgFVlg57SaVDaodc",
  authDomain: "shaaban-d84b3.firebaseapp.com",
  databaseURL: "https://shaaban-d84b3-default-rtdb.firebaseio.com",
  projectId: "shaaban-d84b3",
  storageBucket: "shaaban-d84b3.appspot.com",
  messagingSenderId: "832596226414",
  appId: "1:832596226414:web:512c00862816419f2d517f",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

set(ref(db, "players/" + name), {
  name: name,
  score: 0,
});

var numQuestions = 5;

var pointsPerAnswer = 2;

var currentQuestion = 0;

var score = 0;

var displayedQuestions = [];

var now = new Date();
var hours = now.getHours();
var minutes = now.getMinutes();
var seconds = now.getSeconds();
var timeSubmitted = hours + ":" + minutes + ":" + seconds;
var timer = null;
var timeLeft = 5;

function startTimer() {
  timeLeft = 5;
  timer = setInterval(function () {
    document.getElementById("timer").innerHTML = timeLeft;
    timeLeft--;
    if (timeLeft < 0) {
      clearInterval(timer);
      checkAnswer();
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(timer);
  document.getElementById("timer").innerHTML = "";
}

function displayQuestion() {
  if (displayedQuestions.length === questions.length) {
    stopTimer();
    document.getElementById("question").innerHTML = "انتهت المسابقة !";
    document.getElementById("choices").innerHTML = "";
    document.getElementById("choices").style.display = "none";
    document.getElementById("timer").style.display = "none";
    document.getElementById("score").innerHTML =
      "شكراً لمشاركتك في البطولة، انتظر حتى تصدر نتيجة المسابقة على الشاشة";
    return;
  }

  var randomQuestion;
  do {
    randomQuestion = questions[Math.floor(Math.random() * questions.length)];
  } while (displayedQuestions.indexOf(randomQuestion) !== -1);

  displayedQuestions.push(randomQuestion);

  document.getElementById("question").innerHTML = randomQuestion.question;

  var choicesHTML = "";
  for (var i = 0; i < randomQuestion.choices.length; i++) {
    choicesHTML +=
      "<input type='radio' name='choice' value='" +
      randomQuestion.choices[i] +
      "'>" +
      randomQuestion.choices[i] +
      "<br>";
  }
  document.getElementById("choices").innerHTML = choicesHTML;

  startTimer();
}

function checkAnswer() {
  stopTimer();

  var selectedAnswer = document.querySelector('input[name="choice"]:checked');
  var correctAnswer = displayedQuestions[currentQuestion].answer;
  currentQuestion++;
  if (selectedAnswer && selectedAnswer.value === correctAnswer) {
    score += pointsPerAnswer;

    get(child(ref(db), "players/" + name)).then((snapshot) => {
      if (snapshot.exists()) {
        update(ref(db, "players/" + name), {
          score: snapshot.val().score + pointsPerAnswer,
        });
      }
    });
  }

  if (currentQuestion < numQuestions) {
    displayQuestion();

    get(child(ref(db), "players/" + name)).then((snapshot) => {
      if (snapshot.exists()) {
        // Update player's score
        update(ref(db, "players/" + name), {
          stageOfQuestions: currentQuestion,
        });
      } else {
        // Create new player record
        set(ref(db, "players/" + name), {
          name: name,
          stageOfQuestions: currentQuestion,
        });
      }
    });
  } else {
    document.getElementById("question").innerHTML = "انتهت المسابقة !";
    document.getElementById("choices").innerHTML = "";
    document.getElementById("choices").style.display = "none";
    document.getElementById("timer").style.display = "none";
    document.getElementById("score").innerHTML =
      "شكراً لمشاركتك في البطولة، انتظر حتى تصدر نتيجة المسابقة على الشاشة";
    get(child(ref(db), "players/" + name)).then((snapshot) => {
      if (snapshot.exists()) {
        // Update player's score
        update(ref(db, "players/" + name), {
          stageOfQuestions: currentQuestion,
          dateOfSubmit: timeSubmitted,
        });
      } else {
        // Create new player record
        set(ref(db, "players/" + name), {
          name: name,
          stageOfQuestions: currentQuestion,
        });
      }
    });
  }
}

function checkTimer() {
  if (timeLeft === 0) {
    callback();
  } else {
    setTimeout(function () {
      checkTimer(timeLeft, callback);
    }, 100); // wait for 100ms before checking again
  }
}
checkTimer(timeLeft, function () {
  checkAnswer();
});
displayQuestion();

document.getElementById("submit").addEventListener("click", checkTimer);
