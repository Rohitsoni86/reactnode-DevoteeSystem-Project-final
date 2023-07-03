const jwt = require("jsonwebtoken");
const globalConfig = require("../configs/globalpass.config");

const verify = (req, res, next) => {
  jwt.verify(req.headers.token, globalConfig.SecKey, (err, data) => {
    if (err) {
      res.json({
        message: "Cannot Verify Your Devotee Identity",
        err: err,
      });
    } else {
      console.log(data);
      if (data.Role == "devotee") {
        console.log("Verified Devotee User !!!");
        next();
      } else {
        res.status(401).end("You are Not Authorized To Access !!");
      }
    }
  });
};

module.exports = verify;
