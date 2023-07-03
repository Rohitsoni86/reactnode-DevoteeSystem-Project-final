const express = require("express");
const fetchDataAPI = express.Router();

const {
  fetchCitiesDataDB,
  fetchStateDataDB,
  fetchStateCitiesDataDB,
} = require("../../controller/fetchDataAPI.Controller");

fetchDataAPI.get("/fetchstatelist", fetchStateDataDB);
fetchDataAPI.get("/fetchcitieslist", fetchCitiesDataDB);
fetchDataAPI.get("/fetchcitieslist/:id", fetchStateCitiesDataDB);
module.exports = fetchDataAPI;
