
const express = require('express');
const router = express.Router();


module.exports = (passport) => {


  router.get("/", (req, res) => {
    res.redirect("/login/false");
  })

  router.get('/:repeatedLogin', (req, res) => {
    if(req.isAuthenticated()) return res.redirect("/");
    const repetedLoginBool = (req.params.repeatedLogin === "true")?true:false;
    res.render('login.ejs', {repeatedLogin: repetedLoginBool});
  });


  router.post('/',
    passport.authenticate(
      'local',
      {
        successRedirect: '/',
        failureRedirect: '/login/true',
      }
    )
  );



  return router;
};
