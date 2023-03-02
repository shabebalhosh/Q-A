const PlayerName = document.getElementById("name");

const nameForm = document.getElementById("submitName");
nameForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const name = document.getElementById("name").value;
  window.location.href = `wait.html?name=${name}`;
});

document.getElementById("name").oninput = function () {
  this.value = this.value.replace(/[^\s,أ-ي]/gi, "");
};

const inputBox = document.getElementById("name");
const pTag = document.querySelector(".center p");
const p2Tag = document.querySelector(".center .p2");
const title = document.querySelector(".start h1");

inputBox.addEventListener("focus", function () {
  pTag.classList.add("hidden");
  p2Tag.classList.add("hidden");
  title.classList.add("hidden");
});

inputBox.addEventListener("focusout", function () {
  pTag.classList.remove("hidden");
  p2Tag.classList.remove("hidden");
  title.classList.remove("hidden");
});

document.getElementById("name").setAttribute("autocomplete", "off");

nameForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = document.getElementById("name").value;
  fetch("http://192.168.0.100:8000", {
    method: "POST",
    body: JSON.stringify({ name }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        console.log("Name submitted successfully");
      } else {
        console.error("Failed to submit name");
      }
    })
    .catch((error) => console.error(error));
});
