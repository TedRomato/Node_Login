const User = require('../models/User.js');

module.exports = async (id, done) => {
  let user;
  let error;
  try {
    user = await User.findById(id)

  } catch (e) {
    error = new Error(`No such user with id: ${id}`);

  }

  done(error, user);

}
