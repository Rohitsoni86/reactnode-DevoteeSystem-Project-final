const cityModel = require("../models/cityModel");
const stateModel = require("../models/stateModel");

// fetching Citites Data From Database

const fetchCitiesDataDB = async (req, res, next) => {
  console.log("Requested Cities Data/Details !!");
  try {
    const citiesDetails = await cityModel.find({});
    res.status(200).send(citiesDetails);
    console.log("Sent Cities Data !!");
  } catch (error) {
    console.log("Something Went Wrong in Fetching Cities Data !!");
    res.status(404).send("Something Went Wrong in Fetching Cities Data !!");
  }
};

const fetchStateCitiesDataDB = async (req, res, next) => {
  console.log("Requested Cities Data/Details By States !!");

  const stateID = req.params.id;
  console.log(stateID);
  try {
    const citiesDetails = await cityModel.find({ stateId: stateID });
    console.log(citiesDetails);
    res.status(200).send(citiesDetails);
    console.log("Sent Cities Data !!");
  } catch (error) {
    console.log("Something Went Wrong in Fetching Cities Data !!");
    res.status(404).send("Something Went Wrong in Fetching Cities Data !!");
  }
};

// fetching State Data From Database

const fetchStateDataDB = async (req, res, next) => {
  console.log("Requested Cities Data/Details !!");
  try {
    const stateDetails = await stateModel.find({});
    res.status(200).send(stateDetails);
    console.log("Sent State Data !!");
  } catch (error) {
    console.log("Something Went Wrong in Fetching State Data !!");
    res.status(404).send("Something Went Wrong in Fetching State Data !!");
  }
};

module.exports = {
  fetchCitiesDataDB,
  fetchStateDataDB,
  fetchStateCitiesDataDB,
};
