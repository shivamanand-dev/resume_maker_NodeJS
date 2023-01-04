const express = require("express");
const getUser = require("../../middleware/getUser");
const router = express.Router();
const User = require("../../models/auth/User");
const generateUploadURL = require("../../s3");

router.put("/update", getUser, async (req, res) => {
  try {
    const { liveCountry, name } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { name, liveCountry },
      { returnDocument: "after" }
    );

    return res.send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server error occur" });
  }
});

router.get("/getS3url", async (req, res) => {
  try {
    const s3URL = await generateUploadURL();
    res.status(200).send({ success: true, s3URL: s3URL });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server error occur" });
  }
});

module.exports = router;
