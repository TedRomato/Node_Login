
const express = require('express');
const router = express.Router();


module.exports = (passport) => {


  router.get('/', (req, res) => {
    if(req.isAuthenticated()) return res.redirect("/");
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
