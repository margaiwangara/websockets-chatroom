const express = require("express");
const router = express.Router();

router.get("/api/auth/google", async function(req, res, next) {
  res.send("google auth");
});

module.exports = router;
