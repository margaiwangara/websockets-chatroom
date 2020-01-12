const express = require("express");

// Websocket
var WebSocketServer = require("ws").Server;
var wss = new WebSocketServer({ port: 40510 });
wss.on("connection", function(ws) {
  ws.on("message", function(message) {
    console.log(`Message ${message}`);
  });
  setInterval(() => ws.send("Sending Data", error => console.log(error)), 1000);
});

// init express
const app = express();

// view engine
app.set("view engine", "ejs");
// middleware
app.use(express.json());
app.use(express.static("public"));

// routes
app.get("/", function(req, res) {
  res.render("home", { title: "Homepage" });
});

// port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
