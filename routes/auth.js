const express = require("express");
const router = express.Router();
const User = require("../models/User.js");
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);
const passport   = require('passport');
const session      = require('express-session');
const MongoStore   = require('connect-mongo')(session);
const flash = require('flash');
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');


router.get("/login", ensureLoggedOut(), (req, res) => {
    res.render("auth/login");
  });
  
  router.post("/login", ensureLoggedOut(),
    passport.authenticate("local-login", {
      successRedirect: "/",
      failureRedirect: "/login",
      failureFlash: true
    })
  );
  
  router.get("/signup", ensureLoggedOut(),(req,res) =>{
      res.render("auth/signup");
  })
  
  router.post("/signup", ensureLoggedOut(),
    passport.authenticate("local-signup", {
      successRedirect: "/",
      failureRedirect: "/signup",
      failureFlash: true
    })
  );


router.post("/logout", ensureLoggedIn("/login"), (req, res) => {
    req.logout();
    res.redirect("/");
  });

router.get("/auth/facebook", passport.authenticate("facebook"));
router.get("/auth/facebook/callback", passport.authenticate("facebook", {
  successRedirect: "/private-page",
  failureRedirect: "/"
}));

router.get("/auth/google", passport.authenticate("google", {
  scope: ["https://www.googleapis.com/auth/plus.login",
          "https://www.googleapis.com/auth/plus.profile.emails.read"]
}));

router.get("/auth/google/callback", passport.authenticate("google", {
  failureRedirect: "/",
  successRedirect: "/private-page"
}));

module.exports = router;