const express  = require('express');
const Company = require('../models/Company');
const TYPES    = require('../models/Company-types');
const router   = express.Router();
const { ensureLoggedIn }  = require('connect-ensure-login');
const multer = require('multer');
const upload = multer({ dest: '../images/uploads/' })
const {authorizeCompany, checkOwnership} = require ("../middlewares/authorizationCompany.js")

router.get('/get-locations', (req,res,next)=>{
  Company.find({latitude:{$exists:true}})
  .then(companies=>{
    console.log(companies)
    return res.json(companies);
  })
  .catch(err=>res.send(err));
});

router.get('/new', (req, res) => {
  res.render('companies/new', { types: TYPES });
});

router.post('/new', ensureLoggedIn('/login'), upload.single("picture"),(req, res, next) => {
  console.log(req.body)
  console.log(req.file.filename)
  const newCompany = new Company({
    title: req.body.title,
    description: req.body.description,
    price:req.body.price,
    email:req.body.email,
    category: req.body.category,
    schedule:req.body.calendar,
    latitude : req.body.latitude,
    longitude:req.body.longitude,
    owner: req.user._id, 
    media: `/images/${req.file.filename}`

  });
  console.log('llego aqui ')

  newCompany.save()
    .then(companyCreated => res.redirect(`/company/${companyCreated._id}`))
    .catch(err => console.log(err));
});

router.get('/', (req, res) => {
  Company.find({category:req.query.category})
  .then(companies=>{
    res.render('index', {companies});
    res.json(companies);
  })
  .catch(err=>res.send(err));
});

router.get("/all", (req, res)=>{
  Company.find({}, (err, docs)=>{
    res.render("companies/companies", {companies:docs});
  });
});


router.post('/all/:category', (req, res) => {
  res.render('companies/:category', { types: TYPES });
});

router.get('/own', (req, res)=>{
  console.log('cochinada')
  Company.find({owner:req.user._id})
  .then(company=>{
    return res.render("companies/single",{company})
  })
  .catch(err=>res.send(err));
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
    return res.render('companies/edit', { company, types: TYPES })
  });
});




module.exports = router;
