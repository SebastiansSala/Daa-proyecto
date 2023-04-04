const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

userSchema.methods.isValidPassword = async function(password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);
  return compare;
}

userSchema.methods.generateAuthToken = function() {
  const user = this;
  const token = jwt.sign({ _id: user._id }, 'mysecretkey');
  return token;
}

const User = mongoose.model('User', userSchema);

module.exports = User;
