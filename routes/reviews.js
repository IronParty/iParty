var express = require('express');
var router = express.Router();

router.get('models/Reviews', function(req, res, next) {
  res.send('reviews');
});


router.post('models/Reviews', function(req, res, next) {
  res.render('companies/single');
});


module.exports = router;
