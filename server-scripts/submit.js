var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  user: "mohamed",
  password: "1152005",
  database: "alhosh_db",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");

  // call submitScore() after connection is established
  submitScore(name, score);
});

function submitScore(name, score) {
  connection.query(
    "INSERT INTO scores (name, score) VALUES (?, ?)",
    [name, score],
    function (error, results, fields) {
      if (error) throw error;
      console.log("Score saved!");
    }
  );
}
