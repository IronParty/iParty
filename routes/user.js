const express = require("express");
const router = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

router.get("/profile", ensureLoggedIn("/login"), (req, res) => {
    res.render("auth/profile", {
      user: req.user
    });
  });


  module.exports = router;