const express = require("express");
const router = express.Router();
const Companies = require("../models/Company")

router.get('/', function(req, res, next) {
  res.render('index')
});



module.exports = router;


