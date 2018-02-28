var express = require('express');
var router = express.Router();

const multer = require("multer")

router.get('/', function(req, res, next) {
  res.render('companies/companies',{companies:null});
});


module.exports = router;
