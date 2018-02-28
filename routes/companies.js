const express  = require('express');
const Companies = require('../models/Company');
const TYPES    = require('../models/Company-types');
const router   = express.Router();
const { ensureLoggedIn }  = require('connect-ensure-login');



router.get('/new', (req, res) => {
  res.render('companies/new', { types: TYPES });
});

router.post('/new', (req, res) => {
  console.log('entrando a post de New')
  console.log(req.body)
  
  
});


module.exports = router;
