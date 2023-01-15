const deEncryptAll = require("../services/deEncrypt");

const deEncryptUserDetails = (req, res, next) => {
  const { name, email, username, password, profileImageUrl } = req.body;

  const deEncryptedDetails = deEncryptAll({ username, email, password });

  const data = { ...deEncryptedDetails, name, profileImageUrl };

  req.body = data;

  next();
};

module.exports = deEncryptUserDetails;
