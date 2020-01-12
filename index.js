const express = require("express");

// init express
const app = express();

// view engine
app.set("view engine", "ejs");
// middleware
app.use(express.json());
app.use(express.static("public"));

// port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
