const names = document.getElementById("name").value;
const score = document.getElementById("score").value;
const url = "http://127.0.0.1:5000/score";

fetch(url, {
  method: "POST",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
  body: `name=${names}&score=${score}`,
})
  .then((response) => response.text())
  .then((data) => console.log(data))
  .catch((error) => console.error(error));
