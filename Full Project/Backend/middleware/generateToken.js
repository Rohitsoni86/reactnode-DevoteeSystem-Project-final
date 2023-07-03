const jwt = require("jsonwebtoken");
const globalKeys = require("../configs/globalpass.config");

const generateToken = (userDetails) => {
  console.log("Generating Token !!");
  console.log(userDetails);
  const token = jwt.sign(userDetails.toJSON(), globalKeys.SecKey, {
    expiresIn: "12hr",
  });
  // console.log(token);
  return token;
};

module.exports = { generateToken };
