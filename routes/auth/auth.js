const express = require("express");
const router = express.Router();
const User = require("../../models/auth/User");

router.post("/signup", async (req, res) => {
  try {
    console.log(req.body);

    const { name, email, username, password } = req.body;

    //   Find user with same userName and email
    let user = await User.findOne({ email: email });
    // let availUsername = await User.findOne({ username: username });

    user = await User.create({
      name: name,
      email: email,
      username: username,
      password: password,
    });

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server error occur" });
  }
});

module.exports = router;
