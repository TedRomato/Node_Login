

module.exports = (passport, router) => {


  router.get('/', (req, res) => {
    res.render('login.ejs');
  });


  router.post('/',
    passport.authenticate('local',
      {
        successRedirect: '/',
        failureRedirect: '/login'
      }
    )
  );



  return router;
};
