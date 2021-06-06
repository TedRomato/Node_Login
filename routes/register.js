const express = require('express');
const router = express.Router();
const User = require('../models/User.js');


module.exports = () => {


  router.get('/', (req, res) => {
    console.log("reg");
    res.render('register.ejs');
  });


  router.post('/', async (req, res) => {
    const newUser = new User({username: req.body.username, password: req.body.password, status: null});

    try {
      console.log(await newUser.save());
      res.redirect("/login");
    } catch (e) {
      res.status(500).send('Something broke!')
    }
  });


  return router;
};
