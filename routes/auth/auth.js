const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const User = require("../../models/auth/User");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const JWT_Secret = process.env.JWT_Secret;

router.post(
  "/signup",
  [
    body("email", "Enter correct email").isEmail(),
    body("username", "Username must be min 3 char").isLength({ min: 3 }),
    body("password", "Password must be min 6 char").isLength({ min: 6 }),
  ],
  async (req, res) => {
    try {
      const { name, email, username, password } = req.body;

      //   Handle Validators
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      //   Find user with same userName and email
      let user = await User.findOne({ email: email });
      let availUsername = await User.findOne({ username: username });

      if (user || availUsername) {
        return res.status(400).json({ message: "Already Exists" });
      }

      //   Hash Password
      var salt = bcrypt.genSaltSync(10);
      var hashedPassword = bcrypt.hashSync(password, salt);

      //   Create User
      user = await User.create({
        name,
        email,
        username,
        password: hashedPassword,
      });

      const data = {
        user: {
          id: user.id,
        },
      };

      const authToken = jwt.sign(data, JWT_Secret);

      res.json({ user, authToken });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Server error occur" });
    }
  }
);

module.exports = router;
