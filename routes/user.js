const express = require("express");
const router = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const User = require("../models/User");
const Company = require("../models/Company");

router.get("/profile", ensureLoggedIn("/login"), (req, res) => {
    res.render("user/profile", {
      user: req.user
    });
  });

  router.post("/profile", ensureLoggedIn("/login"), (req,res)=>{
    User.findOneAndUpdate({_id:req.user._id},{
      username:req.body.name,
      email:req.body.email
    })
    .then(result=>{
      res.redirect("/user/profile");
    })
    .catch(err=>res.send(err))
  });

  router.get("/edit", ensureLoggedIn("/login"), (req, res) => {
    res.render("user/edit", {
      user: req.user
    });
  });

  router.post("/edit", (req,res)=>{
    console.log(req.body)
    User.findOneAndUpdate({_id:req.user._id}, {
      username:req.body.name,
      email:req.body.email
    })
    .then(result=>{
      res.redirect("/user/profile");
    })
    .catch(err=>res.send("error"+err));
  });
  
  module.exports = router;
