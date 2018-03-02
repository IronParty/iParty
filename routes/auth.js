const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);
const passport   = require('passport');
const session      = require('express-session');
const MongoStore   = require('connect-mongo')(session);
const flash = require('flash');
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');


router.get("/login", ensureLoggedOut(), (req, res) => {
  if(req.isAuthenticated() )return res.send(req.user);
    res.render("auth/login");
 
  });
  
  router.post("/login",
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


router.get("/logout", ensureLoggedIn('/login'), (req, res) => {
    req.logout();
    res.redirect("/login");
  });

router.get("/auth/facebook", passport.authenticate("facebook"));
router.get("/auth/facebook/callback", passport.authenticate("facebook", {
  successRedirect: "/user/profile",
  failureRedirect: "/"
}));

router.get("/auth/google", passport.authenticate("google", {
  scope: ["https://www.googleapis.com/auth/plus.login",
          "https://www.googleapis.com/auth/plus.profile.emails.read"]
}));

router.get("/auth/google/callback", passport.authenticate("google", {
  failureRedirect: "/",
  successRedirect: "/user/profile"
}));

module.exports = router;