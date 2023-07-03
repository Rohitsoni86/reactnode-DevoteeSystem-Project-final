const express = require("express");

const devoteeRoutes = express.Router();

const {
  verifyDevoteeUser,
  getDevoteeDontaionDetails,
  collectDevoteeDonation,
  getLoginID,
  getDevoteeDetails,
} = require("../controller/devoteeRoutes.Controller");

const { verifyUserOTP } = require("../controller/Mail.Controller");
const verifyUserDevoteeToken = require("../middleware/verifyUserDevoteeToken");

devoteeRoutes.post("/logindevoteeuser", verifyDevoteeUser); // for login functionality

devoteeRoutes.post("/logindevoteeuser/otpverification", verifyUserOTP);

// devoteeRoutes.use(verifyUserDevoteeToken); // first verify Devotee Identity Then You Can Go Ahead
devoteeRoutes.get("/getuserloginid", getLoginID);

devoteeRoutes.get("/getdevoteedonationdetails/:id", getDevoteeDontaionDetails);
devoteeRoutes.get("/getdevoteedetails/:id", getDevoteeDetails);
devoteeRoutes.post("/paydonation", collectDevoteeDonation);

module.exports = devoteeRoutes;
