const express = require("express");
const getUser = require("../../middleware/getUser");
const router = express.Router();
const User = require("../../models/auth/User");

router.put("/update", getUser, (req, res) => {
  try {
    const { country } = req.body;

    return res.send(country);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server error occur" });
  }
});

module.exports = router;
