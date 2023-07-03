const mongoose = require("mongoose");

const cityModel = require("../models/cityModel");
const countryModel = require("../models/countryModel");
const stateModel = require("../models/stateModel");

const createNewCountry = async (req, res, next) => {
  const Details = req.body;
  console.log(`Insert Many Country Request !!!`);
  if (Details) {
    try {
      const CountryData = await countryModel.insertMany(Details);
      console.log(CountryData);
      res.status(200).send("Added countries To Data Base !!");
    } catch (error) {
      console.log("Some Error Occured !!!");
      res.status(500).send(`Cannot Insert Data Error Occured \n ${error}`);
    }
  } else {
    res.status(400).send("Please Provide Details !!!!");
  }
};
const createNewState = async (req, res, next) => {
  const Details = req.body;
  console.log(`Insert Many State Request !!!`);
  if (Details) {
    try {
      const Data = await stateModel.insertMany(Details);
      console.log(Data);
      res.status(200).send("Added State To Data Base !!");
    } catch (error) {
      console.log("Some Error Occured !!!");
      res.status(500).send(`Cannot Insert Data Error Occured \n ${error}`);
    }
  } else {
    res.status(400).send("Please Provide Details !!!!");
  }
};
const createNewCity = async (req, res, next) => {
  const Details = req.body;
  console.log(`Insert Many City Request !!!`);
  if (Details) {
    try {
      const Data = await cityModel.insertMany(Details);
      console.log(Data);
      res.status(200).send("Added City To Data Base !!");
    } catch (error) {
      console.log("Some Error Occured !!!");
      res.status(500).send(`Cannot Insert Data Error Occured \n ${error}`);
    }
  } else {
    res.status(400).send("Please Provide Details !!!!");
  }
};

module.exports = { createNewCountry, createNewState, createNewCity };
