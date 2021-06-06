const User = require('../models/User.js');

module.exports = async (user, done) => {

  done(null, user._id);

}
