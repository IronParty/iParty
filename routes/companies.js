var express = require('express');
var router = express.Router();

router.get('/company', function(req, res, next) {
  res.render('company');
});

module.exports = router;
