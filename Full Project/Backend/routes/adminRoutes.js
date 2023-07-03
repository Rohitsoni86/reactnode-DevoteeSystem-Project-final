const express = require("express");

const adminRoutes = express.Router();

const {
  createAdmin,
  verifyUser,
  createNewDevotee,
  getDonationRecord,
  getUserNotPaidMonth,
} = require("../controller/adminRoutes.Controller");

const verifyUserAdminToken = require("../middleware/verifyUserAdminToken");

const { verifyUserOTP } = require("../controller/Mail.Controller");

const usersMangRoutes = require("./USER MANG ROUTE/usersMangRoutes");

const countryStateCityAddRoute = require("./Data Routes/countryStateCityAddRoute");

adminRoutes.post("/createadmin", createAdmin); /// You Can Create New Admin By Your Self

adminRoutes.post("/loginuser", verifyUser); // for login functionality

adminRoutes.post("/loginuser/otpverification", verifyUserOTP);

adminRoutes.use(verifyUserAdminToken); // first verify Admin Identity Then You Can Go Ahead

adminRoutes.post("/createdevoteeuser", createNewDevotee);
adminRoutes.get("/getdonationrecordadmin", getDonationRecord);
adminRoutes.get("/getdevoteedonationfilter", getUserNotPaidMonth);

adminRoutes.use(countryStateCityAddRoute);

adminRoutes.use(usersMangRoutes);

module.exports = adminRoutes;
