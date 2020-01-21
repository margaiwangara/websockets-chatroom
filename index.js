const express = require("express");
const dotenv = require("dotenv");
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const cookieSession = require('cookie-session');

// init express
const app = express();

// dotenv config
dotenv.config({ path: "./config/config.env" });

// view engine
app.set("view engine", "ejs");
// middleware
app.use(express.json());
app.use(express.static("public"));

// config cookie session
app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: ['ludacris']
}));

const db = require('./models');

// config passport oauth
passport.use(GoogleStrategy({
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:5000/auth/google/callback" 
},
function(accessToken, refreshToken, profile, done){
  // findone
  db.User.findOne({ googleId: profile.id }).then(data => {
    if(!data){
      // create
      db.User.create({ googleId: profile.id }).then(data => data).catch(error => console.log(error));
    }
  }).catch(error => console.log(error));
}
));


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
