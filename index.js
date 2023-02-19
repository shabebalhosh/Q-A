const PlayerName = document.getElementById("name");

const nameForm = document.getElementById("submitName");
nameForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const name = document.getElementById("name").value;
  window.location.href = `questions.html?name=${name}`;
});
