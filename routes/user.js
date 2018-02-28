router.get('/:id', function(req, res, next) {
    res.render('user_id',user);
  });
  
  router.get('/:id/edit', function(req, res, next) {
    res.render('user_id',user);
  });
  
  router.post('/:id/edit', function(req, res, next) {
    res.render('user_id',user);
  });