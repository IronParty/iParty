const express = require("express");
const router = express.Router();
const User = require("../models/User.js");
const multer = require("multer");
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


router.get('/login', ensureLoggedOut(), (req, res) => {
    res.render('auth/login');
});

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

router.get("/profile", ensureLoggedIn("/login"), (req, res) => {
  res.render("auth/profile", {
    user: req.user
  });
});

router.get("/upload", (req, res, next) => {
  res.render("upload");
});

const upload = multer({ dest: "./public/images/" });

router.post("/upload", upload.array("photo"), (req, res) => {
  console.log(req.file);
  const pic = new Picture({
    name: req.body.name,
    path: `/images/${req.file.filename}`,
    originalName: req.file.originalname
  });

  pic.save(err => {
    if (err) console.log(err);
    res.redirect("/");
  });
});

router.get("/images", (req, res) => {
  Picture.find()
    .then(docs => {
      res.render("list_pictures", { pictures: docs });
    })
    .catch(err => {
      res.send(err);
    });
});

router.post("/logout", ensureLoggedIn("/login"), (req, res) => {
  req.logout();
  res.redirect("/");
});

router.get('/', function(req, res, next) {
  res.render('index', { title: 'iParty' });
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