const express = require("express");
const router = express.Router();
const User = require("../models/User.js");
const cookieParser = require('cookie-parser');
const bodyParser   = require('body-parser');
const layouts      = require('express-ejs-layouts');
const mongoose     = require('mongoose');
const session      = require('express-session');
const MongoStore   = require('connect-mongo')(session);
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);
const passport   = require('passport');
const flash = require('flash');
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');


router.get("/signup", (req,res, next)=>{
    res.render("auth/signup");
})

.post("/signup", (req,res,next)=>{
    const username = req.body.username,
          password = req.body.password;
    if(username === "" || password === ""){
        res.render("auth/signup", {message: "Please enter username and password"});
        return;
    }

    User.findOne({username}, "username", (err, user)=>{
       if (user !== null){
           res.render("auth/signup", {message:"The username already exists, please enter a different username"});
           return;
       }

       const hashPass = bcrypt.hashSync(password, salt);

       const newUser = new User({
          username,
          password:hashPass
       });

       newUser.save(err=>{
           if (err) return res.render("auth/signup", { message: "Something went wrong" });
            res.redirect("/");
       });

    });
});



router.get('/login', ensureLoggedOut(), (req, res) => {
    res.render('authentication/login', { message: req.flash('error')});
});

router.post('/login', ensureLoggedOut(), passport.authenticate('local-login', {
  successRedirect : '/',
  failureRedirect : '/login',
  failureFlash : true
}));

router.get('/signup', ensureLoggedOut(), (req, res) => {
    res.render('authentication/signup', { message: req.flash('error')});
});

router.post('/signup', ensureLoggedOut(), passport.authenticate('local-signup', {
  successRedirect : '/',
  failureRedirect : '/signup',
  failureFlash : true
}));

router.get('/profile', ensureLoggedIn('/login'), (req, res) => {
    res.render('authentication/profile', {
        user : req.user
    });
});

router.post('/logout', ensureLoggedIn('/login'), (req, res) => {
    req.logout();
    res.redirect('/');
});


module.exports = router;





