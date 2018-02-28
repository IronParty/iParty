const express  = require('express');
const Company = require('../models/Company');
const TYPES    = require('../models/Company-types');
const router   = express.Router();
const { ensureLoggedIn }  = require('connect-ensure-login');
const {authorizeCompany, checkOwnership} = require ("../middlewares/authorizationCompany.js")



router.get('/new', (req, res) => {
  res.render('companies/new', { types: TYPES });
});

router.post('/new', ensureLoggedIn('/login'),(req, res, next) => {
  console.log(req.body)
  const newCompany = new Company({
    title: req.body.title,
    description: req.body.description,
    price:req.body.price,
    email:req.body.email,
    category: req.body.category,
    schedule:req.body.calendar,
    owner: req.user._id
  });
  console.log('llego aqui ')

  newCompany.save()
    .then(companyCreated => res.redirect(`/company/${companyCreated._id}`))
    .catch(err => console.log(err));
});

router.get('/all/:category', (req, res) => {
  res.render('companies/:category', { types: TYPES });
});

router.post('/all/:category', (req, res) => {
  res.render('companies/:category', { types: TYPES });
});



router.get('/:id' , (req, res, next) => {
  Company.findById(req.params.id)
    .populate("_owner")
    .then(result => res.render("companies/single", {company:result}))
});

router.get('/:id/edit', ensureLoggedIn('/login'), authorizeCompany, (req, res, next) => {
  Company.findById(req.params.id, (err, campaign) => {
    if (err)       { return next(err) }
    if (!company) { return next(new Error("404")) }
    return res.render('company/edit', { company, types: TYPES })
  });
});

module.exports = router;
