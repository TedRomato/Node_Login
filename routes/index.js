const express = require('express');
const router = express.Router();
const authenticated = require('../passport_util/authenticated.js');


module.exports = (passport) => {


  router.get('/',
  (req, res, next) => authenticated(req, res, next),
    (req, res) => {
      res.render('index.ejs', {user: req.user})
    }
  );


  return router;
};
