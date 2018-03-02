const express  = require('express');
const Company = require('../models/Company');
const TYPES    = require('../models/Company-types');
const router   = express.Router();
const { ensureLoggedIn }  = require('connect-ensure-login');
const multer = require('multer');
const upload = multer({ dest: './public/images' })
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

router.post('/new', ensureLoggedIn('/login'), upload.single("photo"),(req, res, next) => {
  console.log(req.body)
  console.log(req.user)
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

router.get('/searchCategory', (req, res) => {
  console.log("entro a buscar con query's")
  console.log(req.query.category)
  Company.find({category:req.query.category})
  .then(companies=>{
    res.render('companies/companies', {companies});
  })
  .catch(err=>res.send(err));
});

router.get("/all", (req, res)=>{
  Company.find({}, (err, docs)=>{
    res.render("companies/companies", {companies:docs});
  });
});

router.get('/all/:category', (req, res) => {
  res.render('companies/category/:category', { types: TYPES });
});

router.post('/all/:category', (req, res) => {
  res.render('companies/:category', { types: TYPES });
});

router.get('/own', (req, res)=>{
  console.log('own company')
  Company.find({owner:req.user._id})
  .then(company=>{
    console.log(company);
   res.render("companies/own",{company})
  })
  .catch(err=>res.send(err));
});

router.get("/edit/:idCompany", ensureLoggedIn("/login"), (req, res) => {
  Company.findById(req.params.idCompany)
    .then(result =>{
      console.log(result)
      res.render("companies/edit", { user: req.user,company: result})
})
  
});

router.post("/edit/:idCompany",upload.single("photo"), (req,res)=>{
  console.log("editando")
  Company.findByIdAndUpdate(req.params.idCompany, {
    title:req.body.title,
    email:req.body.email,
    description:req.body.description,
    price:req.body.price,
    schedule:req.body.calendar,
    media:`/images/${req.file.filename}`,
  })
  .then(result=>{
    console.log(result)
    res.redirect("/company/all");
  })
  .catch(err=>res.send("error"+err));
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
