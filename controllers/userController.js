const User = require("../model/userModel");

const user_index_get = (req, res) => {
  res.send("hello world");
};

const user_index_post = async (req, res) => {
  console.log(req.body);
  const { username, password, email } = req.body;

  let user = await User.findOne({ username });
  if (user)
    return res
      .status(400)
      .send("The Username or Password is Incorrect Try again.");

  user = new User({ username, password, email });
  console.log(user);
  await user.save();
  return res.send({
    token: user.getAuthToken(),
  });
};

const user_login_post = async (req, res) => {
  console.log(req.body);
  const { username, password, email } = req.body;

  let user = await User.findOne({ username, password });
  if (!user)
    return res.send({
      user,
      token: user.getAuthToken(),
    });
};

module.exports = { user_index_get, user_index_post, user_login_post };
