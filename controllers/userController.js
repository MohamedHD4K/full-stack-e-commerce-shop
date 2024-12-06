const User = require("../model/userModel");

const user_post = async (req, res) => {
  const { username, password, email, img } = req.body;

  let user = await User.findOne({ username });
  if (user)
    return res
      .status(400)
      .send("The Username or Password is Incorrect Try again.");

  user = new User({ username, password, email, img });
  console.log(user);
  await user.save();
  return res.send({
    token: user.getAuthToken(),
  });
};

const auth_post = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username) return res.status(400).send("Username is required");
    if (!password) return res.status(400).send("Password is required");

    const user = await User.findOne({ username });
    if (!user) return res.status(401).send("Invalid username or password");

    const isMatch = await user.checkPassword(password);
    if (!isMatch) return res.status(401).send("Invalid username or password");

    return res.send(user.getAuthToken());
  } catch (error) {
    console.log(error);
    return res.status(500).send("An error occurred during authentication");
  }
};

const user_update = async (req, res) => {
  const { id, username, email, img } = req.body;
  console.log(req.body);

  try {
    const user = await User.findByIdAndUpdate(
      { _id: id },
      { username, email, img },
      { new: true }
    );

    if (!user) {
      return res.status(404).send({ error: "user not found" });
    }

    console.log("User", user);

    return res.send(user);
  } catch (error) {
    console.log(error);
    return res.status(500).send("An error occurred during authentication");
  }
}

module.exports = { user_post, auth_post, user_update };
