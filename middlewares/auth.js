const jwt = require("jsonwebtoken");

module.exports = authMid = (req, res, next) => {
  const token = req.header("Token");

  if (!token) {
    return res.status(401).send("Unauthorized, please login first");
  }

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    return res.status(401).send("Invalid token");
  }
};
