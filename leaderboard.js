import "https://www.gstatic.com/firebasejs/7.21.1/firebase-app.js";
import "https://www.gstatic.com/firebasejs/7.21.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyArDynFiDleYc0pw5vOgFVlg57SaVDaodc",
  authDomain: "shaaban-d84b3.firebaseapp.com",
  databaseURL: "https://shaaban-d84b3-default-rtdb.firebaseio.com",
  projectId: "shaaban-d84b3",
  storageBucket: "shaaban-d84b3.appspot.com",
  messagingSenderId: "832596226414",
  appId: "1:832596226414:web:512c00862816419f2d517f",
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

const leaderboardRef = database.ref("players");
leaderboardRef
  .orderByChild("score")
  .limitToLast(32)
  .once("value", function (snapshot) {
    const sortedData = Object.values(snapshot.val()).sort(
      (a, b) => b.score - a.score
    );
    let rank = 1;
    sortedData.forEach(function (childData) {
      const name = childData.name;
      const score = childData.score;
      const row = document.createElement("tr");
      const rankCell = document.createElement("td");
      const nameCell = document.createElement("td");
      const scoreCell = document.createElement("td");
      rankCell.innerText = rank + " #";
      rankCell.classList.add("rank");
      nameCell.innerText = name;
      nameCell.classList.add("name");
      scoreCell.innerText = score;
      scoreCell.classList.add("score");
      row.appendChild(rankCell);
      row.appendChild(nameCell);
      row.appendChild(scoreCell);
      document.querySelector("table").appendChild(row);
      rank++;
    });
  });
