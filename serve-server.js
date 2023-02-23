const http = require("http");
const fs = require("fs");

const WAIT_TIME_MS = 5 * 60 * 1000; // 5 minutes in milliseconds

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    // Serve the wait page
    res.writeHead(200, { "Content-Type": "text/html" });
    fs.readFile("wait.html", (err, data) => {
      if (err) {
        res.writeHead(500);
        return res.end("Error loading wait page");
      }
      res.end(data);
    });

    if (req.url === "/save-name" && req.method === "POST") {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
      });
      req.on("end", () => {
        const data = JSON.parse(body);
        const name = data.name;
        // Store the name variable here
        console.log(`Name received: ${name}`);
        res.end("Name received");
      });
      return;
    }

    // Set a timer to redirect after 5 minutes
    setTimeout(() => {
      res.writeHead(302, { Location: "/questions.html?name=${name}" });
      res.end();
    }, WAIT_TIME_MS);
  } else if (req.url === "/questions.html") {
    // Serve the redirect page
    res.writeHead(200, { "Content-Type": "text/html" });
    fs.readFile("questions.html", (err, data) => {
      if (err) {
        res.writeHead(500);
        return res.end("Error loading redirect page");
      }
      res.end(data);
    });
  } else {
    // Handle other requests (e.g., 404 page)
    res.writeHead(404);
    res.end("Page not found");
  }
});

server.listen(3000, () => {
  console.log("Server listening on port 3000");
});
