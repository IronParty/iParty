const express = require("express");
const router = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const User = require("../models/User");

router.get("/profile", ensureLoggedIn("/login"), (req, res) => {
    res.render("user/edit", {
      user: req.user
    });
  });

  router.post("/profile", (req,res)=>{
    User.findOneAndUpdate({_id:req.user._id}, {
      username:req.body.name,
      email:req.body.email
    })
    .then(result=>{
      res.redirect("/user/profile");
    })
    .catch(err=>res.send("error"+err));
  });



  // document.getElementById('edit-user-form').onsubmit = function(e){
  //   e.preventDefault();
  //   var oneUser = {
  //     name:e.target.name.value,
  //     email:e.target.email.value
  //   };
  //   charactersAPI.updateOneRegister(oneUser)
  //   .then(r=>{
  //     $("#edit-submit");
  //   })
  //   .catch(r=>{
  //     $("#edit-submit");
  //   });

  // }
  module.exports = router;
