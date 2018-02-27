var express = require('express');
var router = express.Router();

router.get('/comments', function(req, res, next) {
  res.send('comments');
});

module.exports = router;
