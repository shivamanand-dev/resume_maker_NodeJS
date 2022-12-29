const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

function getUser(req, res, next) {
  const token = req.header("authToken");

  if (!token) {
    return res.status(401).json({ message: "Login First" });
  }

  const data = jwt.verify(token, JWT_SECRET);

  //   console.log(req.user);
  req.user = data.user;

  next();
}

module.exports = getUser;
