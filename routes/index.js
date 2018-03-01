const express = require("express");
const router = express.Router();
// const companies = require("companies");

router.get('/', function(req, res, next) {
  res.render('index', { title: 'iParty' });
});

// router.get('/', function(req, res, next) {
//   companies.find()
//     .then(respuesta =>  res.render("index",{companies:respuesta}))
//     .catch(err => res.render("error"));
// });



module.exports = router;