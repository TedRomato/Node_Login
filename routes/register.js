const express = require('express');
const router = express.Router();
const User = require('../models/User.js');
const bcrypt = require('bcrypt');
const saltRounds = 13;


module.exports = () => {


  router.get('/', (req, res) => {
    res.redirect('/register/false/null');
  });


  router.get('/:usernameIsTaken/:requestedUsername', (req, res) => {
    let requestedUsername = req.params.requestedUsername;
    if(req.params.usernameIsTaken === 'false') requestedUsername = null;
    res.render('register.ejs', {requestedUsername: requestedUsername});
  });


  router.post('/', async (req, res) => {

    try {

      const registeredUser = await User.findOne({username: req.body.username});

      if(registeredUser) return res.redirect(`/register/true/${registeredUser.username}`);

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
