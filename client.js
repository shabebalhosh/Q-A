const name = 'محمد هاشم'; // replace with your name
const score = 1000; // replace with your actual score data
const url = 'http://127.0.0.1:5000/score'; // replace with your server URL

fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  body: `name=${name}&score=${score}`
})
.then(response => response.text())
.then(data => console.log(data))
.catch(error => console.error(error))
