const { execSync } = require("child_process");
const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 3000 });

let nbOfPlayers = 0;

wss.on("connection", function connection(ws) {
  nbOfPlayers++;
  console.log(
    "new player joined the competition! Nb of players online: " + nbOfPlayers
  );

  if (nbOfPlayers === 2) {
    console.log("starting competition in 10seconds..");
    execSync("sleep 15");
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send("start-comp");
      }
    });
    nbOfPlayers = 0;
  }
});
