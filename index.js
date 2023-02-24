const PlayerName = document.getElementById("name");

const nameForm = document.getElementById("submitName");
nameForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const name = document.getElementById("name").value;
  window.location.href = `questions.html?name=${name}`;
});


nameForm.addEventListener('submit', event => {
  event.preventDefault();
  const name = document.getElementById('name').value;
  fetch('http://localhost:8000', {
    method: 'POST',
    body: JSON.stringify({ name }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => {
    if (response.ok) {
      console.log('Name submitted successfully');
    } else {
      console.error('Failed to submit name');
    }
  })
  .catch(error => console.error(error));
});