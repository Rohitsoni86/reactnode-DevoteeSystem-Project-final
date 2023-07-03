const express = require("express");
const { model } = require("mongoose");

const usersMangRoutes = express.Router();

const {
  getDevoteeDataDB,
  deleteDevoteeData,
  editDevoteeData,
  updateDevoteeUser,
} = require("../../controller/userMangRoutes.Controller");

usersMangRoutes.get("/getalluserdevoteedata", getDevoteeDataDB);
usersMangRoutes.delete("/deleteuserdevoteedata/:id", deleteDevoteeData);
usersMangRoutes.get("/edituserdevoteedata/:id", editDevoteeData);
usersMangRoutes.put("/edituserdevoteedata/:id/updateuser", updateDevoteeUser);

module.exports = usersMangRoutes;
