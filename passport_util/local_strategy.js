const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User.js')
const bcrypt = require('bcrypt');



const strategy = new LocalStrategy(

  async (username, password, done) => {
    console.log("In strategy");
    let user;

    try {
      user = await User.findOne({username: username});

    } catch (e) {
      return done(null, false, { message: `No such user with username: ${username}` });

    }

    if(!await bcrypt.compare(password, user.password)) return done(null, false, { message: 'Incorrect password.' });


    console.log("returning user:");
    console.log(user);
    return done(null, user);
  }
)



module.exports = strategy;
