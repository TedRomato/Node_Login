const express = require('express');
const router = express.Router();
const User = require('../models/User.js');
const bcrypt = require('bcrypt');
const saltRounds = 13;



module.exports = () => {

  router.get('/', (req, res) => {
    res.redirect('/register/null');
  });

  router.get('/:requestedUsername', (req, res) => {
    const requestedUsername = req.params.requestedUsername;
    res.render('register.ejs', {requestedUsername: req.params.requestedUsername});
  });


  router.post('/', async (req, res) => {

    try {

      const registeredUser = await User.findOne({username: req.body.username});

      if(registeredUser) return res.redirect(`/register/${registeredUser.username}`);

      const newUser = new User({username: req.body.username, password: undefined, status: null});

      const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
      newUser.password = hashedPassword;
      await newUser.save();
      req.login(newUser, (err) => {
        if(err) res.redirect("/login")
        res.redirect("/");
      });
    } catch (e) {
      console.log(e);
      res.status(500).send('Something broke!');
    }
  });


  return router;
};
