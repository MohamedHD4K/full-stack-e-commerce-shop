const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
    min: 3,
    max: 50,
  },
  password: {
    type: String,
    require: true,
    min: 6,
    max: 300,
  },
  email: {
    type: String,
    require: true,
    min: 10,
    max: 300,
  },
  img: {
    type: String,
    required: true,
  },
});

userSchema.pre("save", async function (next) {
  const salt = bcrypt.genSaltSync(10);
  const hashed = bcrypt.hashSync(this.password, salt);
  this.password = hashed;
  next();
});

userSchema.methods.getAuthToken = function () {
  return jwt.sign(this.toJSON(), process.env.JWT_SECRET);
};

userSchema.methods.checkPassword = function (password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);
module.exports = User;

module.exports = User;
