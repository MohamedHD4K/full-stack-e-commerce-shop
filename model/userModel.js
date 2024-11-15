const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 5,
    max: 50,
  },
  password: {
    type: String,
    required: true,
    min: 5,
    max: 300,
  },
  email: {
    type: String,
    required: true,
    min: 10,
    max: 300,
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

const User = mongoose.model("User", userSchema);
module.exports = User;
