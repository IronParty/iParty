const express = require("express");
const router = express.Router();

router.get('/', function(req, res, next) {
    Company.find({})
    .then(companies => {
      console.log(companies)
      res.render("booking", {companies})
    })
    .catch (err => res.render("error"))   
});

module.exports = router;