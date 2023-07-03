const devoteeUserModel = require("../models/devoteeUserModel");
const Joi = require("joi");

const getDevoteeDataDB = async (req, res, next) => {
  console.log("Requested Devotee Data/Details !!");
  try {
    const Details = await devoteeUserModel
      .find()
      .populate({
        path: "Address.State",
        select: "stateName",
      })
      .populate({
        path: "Address.City",
        select: "cityName",
      });
    res.status(200).send(Details);
    console.log("Sent Devotees Data !!");
  } catch (error) {
    console.log("Something Went Wrong in Fetching Devotees Data !!");
    res.status(404).send("Something Went Wrong in Fetching Devotees Data !!");
  }
};

const deleteDevoteeData = async (req, res, next) => {
  console.log("Requested Delete Devotee User !!");

  const userId = req.params.id;
  console.log(userId);
  try {
    const userDetails = await devoteeUserModel.findByIdAndDelete(userId);
    console.log(userDetails);
    res.status(200).send("User Successfully Deleted !!");
    console.log("User Successfully Deleted !!");
  } catch (error) {
    console.log("Something Went Wrong in Deleting User Data !!");
    res.status(404).send("Something Went Wrong in Deleting User Data !!");
  }
};

// EDIT DEVOTEE DETAILS

const editDevoteeData = async (req, res, next) => {
  const userId = req.params.id;
  console.log(userId);
  console.log("Edit Devotee Data Request !!");

  console.log("Requested Devotee Data/Details !!");
  try {
    const Details = await devoteeUserModel
      .findById(userId)
      .populate({
        path: "Address.State",
        select: "stateName",
      })
      .populate({
        path: "Address.City",
        select: "cityName",
      });
    res.status(200).send(Details);
    console.log("Sent Devotees Data !!");
  } catch (error) {
    console.log(error);
    console.log("Something Went Wrong in Fetching Devotees Data !!");
    res.status(404).send("Something Went Wrong in Fetching Devotees Data !!");
  }
};

// UPDATE DEVOTEE

const updateDevoteeUser = async (req, res, next) => {
  const userIdToupdate = req.params.id;
  const userDetails = req.body;
  console.log(userDetails);

  // Validate user Data First

  // JOI VALIDATION

  const registerAdminUserSchema = Joi.object({
    FirstName: Joi.string().min(3).required(),
    LastName: Joi.string().min(3).required(),
    Address: Joi.object().keys({
      State: Joi.string().required(),
      City: Joi.string().required(),
      Pincode: Joi.string().required(),
    }),
    Email: Joi.string().email().lowercase().required(),
  });

  //options
  const Options = {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true,
  };

  //Validate reqbody

  const { error, value } = registerAdminUserSchema.validate(req.body, Options);

  if (error) {
    res
      .status(501)
      .send(
        `Error :: ${error.details.map((error) => error.message).join(",")}`
      );
  } else {
    console.log("No Error !!");

    // USUAL VALIDATION id required

    // Try To find And Update

    try {
      const userToUpdate = await devoteeUserModel.findByIdAndUpdate(
        userIdToupdate,
        userDetails
      );
    } catch (error) {
      console.log(error);
    }
  }
};

module.exports = {
  getDevoteeDataDB,
  deleteDevoteeData,
  editDevoteeData,
  updateDevoteeUser,
};
