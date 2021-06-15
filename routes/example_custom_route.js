const express = require('express');
const router = express.Router();
const authenticated = require('../passport_util/authenticated.js');
const User = require('../models/User.js');


module.exports = (passport) => {


  router.get('/',
  (req, res, next) => authenticated(req, res, next),
    (req, res) => {
      res.render('example_custom_view.ejs', {user: req.user})
    }
  );


  router.post('/logout',
  (req, res, next) => authenticated(req, res, next),
    (req, res) => {
      req.logout();
      res.redirect("/login");
    }
  );


  router.post('/setStatus',
  (req, res, next) => authenticated(req, res, next),
    async (req, res) => {
      try {
        req.user.status = req.body.status;
        await req.user.save();
        res.render('example_custom_view.ejs', {user: req.user});
      } catch (e) {
        console.log(e);
        res.status(500).send('Something broke!');
      }
    }
  );


  return router;
};
