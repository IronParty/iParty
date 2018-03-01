const express = require("express");
const router = express.Router();
const Companies = require("../models/Company")

router.get('/', function(req, res, next) {
  res.render('index', { title: 'iParty' });
});

router.get('/', function(req, res, next) {
  Companies.find()
    .then(respuesta =>  res.render("index",{companies:respuesta}))
    .catch(err => res.render("error"));
});



module.exports = router;


