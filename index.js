const express = require("express");
const dotenv = require("dotenv");

// init express
const app = express();

// dotenv config
dotenv.config({ path: "./config/config.env" });

// view engine
app.set("view engine", "ejs");
// middleware
app.use(express.json());
app.use(express.static("public"));

// mongodb
const db = require("./models");

// routes
app.get("/auth/google", function(req, res) {});

app.get("/home", function(req, res) {
  res.send("Homepage");
});

// port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
