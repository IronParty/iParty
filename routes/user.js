const express = require("express");
const router = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

router.get("/profile", ensureLoggedIn("/login"), (req, res) => {
    res.render("auth/profile", {
      user: req.user
    });
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
