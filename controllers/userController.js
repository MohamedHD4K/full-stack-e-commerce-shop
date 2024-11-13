const User = require("../model/userModel");

const user_index_get = (req, res) => {
  res.send("hello world");
};

const user_index_post = async (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;

  const user = new User({ username, password });
  console.log(user);
  await user.save();
  return res.send({
    user,
    "x-auth-token": user.getAuthToken(),
  });
};

module.exports = { user_index_get, user_index_post };
