const express = require("express");
// const verifyUserIdentity = require("../../middlewares/verifyUserIdentity");
const countryStateCityAddRoute = express.Router();
const {
  createNewCountry,
  createNewState,
  createNewCity,
} = require("../../controller/countryStateCityMangRoute.Controller");
const fetchDataAPI = require("./fetchDataAPI");

countryStateCityAddRoute.post("/addcountry", createNewCountry);
countryStateCityAddRoute.post("/addstate", createNewState);
countryStateCityAddRoute.post("/addcity", createNewCity);
countryStateCityAddRoute.use(fetchDataAPI);
module.exports = countryStateCityAddRoute;
