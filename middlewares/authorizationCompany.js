const Campaign = require('../models/Company.js');

function authorizeCompany(req, res, next){
  Company.findById(req.params.id, (err, company) => {
    // If there's an error, forward it
    if (err)      { return next(err) }
    // If there is no campaign, return a 404
    if (!company){ return next(new Error('404')) }
    // If the campaign belongs to the user, next()
    if (company._creator.equals(req.user._id)){
      return next()
    } else {
    // Otherwise, redirect
      return res.redirect(`/company/${company._id}`)
    }
  });
}

//este middleware es opcional.
//me explico, pueden utilizar en el ejs  el if (user._id === campaign._owner)
function checkOwnership(req, res, next){
  Company.findById(req.params.id, (err, company) => {
    if (err){ return next(err) }
    if (!company){ return next(new Error('404')) }
//podemos almacenar en res.locals cualquier dato que nos interesa a futuro
    if (company._creator.equals(req.user._id)){
      res.locals.companyIsCurrentUsers = true;
    } else {
      res.locals.companyIsCurrentUsers = false;
    }
    return next()
  });
}

module.exports = {authorizeCompany,checkOwnership} ;