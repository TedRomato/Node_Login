const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  status: String
},
{
  collection:"users"
});



module.exports = mongoose.model('User', userSchema);
