const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

app.post("/submit-form", (req, res) => {
  // Process the form data here
  const formData = req.body;

  // Simulate processing time
  setTimeout(() => {
    const success = Math.random() < 0.5; // Simulate success/failure

    if (success) {
      // Send a success response
      res.status(200).json({ success: true });
    } else {
      // Send an error response
      res.status(500).json({ success: false, message: "An error occurred" });
    }
  }, 5000); // Simulate processing time of 5 seconds
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
