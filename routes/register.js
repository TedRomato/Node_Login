const express = require('express');
const router = express.Router();
const User = require('../models/User.js');
const bcrypt = require('bcrypt');
const saltRounds = 13;



module.exports = () => {


  router.get('/', (req, res) => {
    console.log("reg");
    res.render('register.ejs');
  });


  router.post('/', async (req, res) => {
    const newUser = new User({username: req.body.username, password: undefined, status: null});

    try {
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
