const Joi = require("joi");
const bcrypt = require("bcrypt");
const { sendEmail } = require("../middleware/sendMailToAdmin");
const jwt = require("jsonwebtoken");
const globalConfig = require("../configs/globalpass.config");
const mongoose = require("mongoose");
//devotee

const devoteeUserModel = require("../models/devoteeUserModel");

const donationModel = require("../models/donationModel");

const verifyDevoteeUser = async (req, res, next) => {
  const userDetails = req.body;
  console.log(userDetails);
  console.log("Login User Devotee Req !");
  // JOI VALIDATION

  const userSchemaVa = Joi.object({
    Email: Joi.string().email().lowercase().required(),
    Password: Joi.string().min(7).required().strict(),
  });

  //options
  const Options = {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true,
  };

  //Validate reqbody

  const { error, value } = userSchemaVa.validate(req.body, Options);

  if (error) {
    res
      .status(501)
      .send(` ${error.details.map((error) => error.message).join(",")}`);
  } else {
    console.log("No Validation Error !!");

    // USUAL VALIDATION

    const User = await devoteeUserModel.find({ Email: userDetails.Email });
    console.log(User);
    console.log(User.length);
    //if User Exists There Then

    if (User.length) {
      try {
        console.log("User Devotee Login Request !!");
        console.log(User);

        // Decrypting PASSWORD
        bcrypt.compare(
          userDetails.Password,
          User[0].Password,
          async function (err, result) {
            if (err) {
              console.log("Password Do Not Match !! \n Please Try Again !!");
              console.log(err);
              res
                .status(500)
                .send("Password Do Not Match !! \n Please Try Again !!");
            } else {
              console.log(result);
              if (result) {
                // if user details match generate new OTP for verification !!!

                // generate OTP
                const mailOTP = await sendEmail(User); //retruns true & false
                setTimeout(() => {
                  if (mailOTP) {
                    res.status(200).send("Please Check Your Email For OTP !!");
                  } else {
                    console.log("Something Went Wrong Login User OTP Error !!");
                    res
                      .status(500)
                      .send(
                        "Internal Server Error \n Something Went Wrong Login User OTP Error !!  Try Again !! "
                      );
                  }
                }, 2000);
              } else {
                console.log("Password Do Not Match !! \n Please Try Again !!");
                res
                  .status(404)
                  .send("Password Do Not Match !! \n Please Try Again !!");
              }
            }
          }
        );
      } catch (error) {
        console.log("Something Went Wrong Login User !!");
        res
          .status(500)
          .send(
            "Internal Server Error \n Something Went Wrong Login User !!  Try Again !! "
          );
      }
    }
    // If User Does Not Exists then Proceed
    else {
      res.status(503).send("User Does Not Exists !! \n Try Signup ");
    }
  }
};

// Get Donation Details of Perticular User

const getLoginID = async (req, res, next) => {
  console.log("Requested Login Id Devotee User !!");

  jwt.verify(req.headers.token, globalConfig.SecKey, (err, data) => {
    if (err) {
      res.status(404).json({
        message: "Cannot Verify Your Devotee Identity",
        err: err,
      });
    } else {
      console.log(`Requested Login id ::: ===> ${data._id}`);
      res.status(200).send({ userID: data._id });
    }
  });
};

const getDevoteeDontaionDetails = async (req, res, next) => {
  console.log("Requested Donation Details Devotee User !!");

  const userId = req.params.id;
  console.log(userId);
  try {
    const userDetails = await donationModel.aggregate([
      { $match: { UserID: new mongoose.Types.ObjectId(userId) } },
      {
        $group: {
          _id: {
            UserID: "$UserID",
            year: "$YearofDonation",
            MonthofDonation: "$MonthofDonation",
            NameMonthofDonation: "$NameMonthofDonation",
          },
          totalDonation: {
            $sum: "$AmountPaid",
          },
        },
      },
    ]);
    // console.log(userDetails);
    res.status(200).send(userDetails);
    console.log("User Details Successfully Sent !!");
  } catch (error) {
    console.log("Something Went Wrong in Getting User Data !!");
    res.status(404).send("Something Went Wrong in Getting User Data !!");
  }
};

const collectDevoteeDonation = async (req, res, next) => {
  const userDonaionDetails = req.body;
  console.log(userDonaionDetails);
  console.log(" User Donation Devotee Req !");
  // JOI VALIDATION

  const donationSchemaVal = Joi.object({
    UserID: Joi.string().min(6).required(),
    YearofDonation: Joi.number().min(4).required(),
    MonthofDonation: Joi.number().required(),
    NameMonthofDonation: Joi.string().required(),
    AmountPaid: Joi.number().min(4).required(),
  });

  //options
  const Options = {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true,
  };

  //Validate reqbody

  const { error, value } = donationSchemaVal.validate(req.body, Options);

  if (error) {
    res
      .status(501)
      .send(` ${error.details.map((error) => error.message).join(",")}`);
  } else {
    console.log("No Amount Validation Error !!");

    try {
      const newDonationByUser = await donationModel.create(userDonaionDetails);
      newDonationByUser.save();
      console.log("New Donation Added To DB !!");
      res
        .status(200)
        .send("New Donation Added To DB !! Thanks For Your Contribution !!");
      // We can Now Send Email Rec To The User By calling MiddleWare
    } catch (err) {
      console.log(
        "Something Went Wrong Submitting Your Donation Please Try Again !!"
      );
      console.log(err);
      res
        .status(500)
        .send(
          "Something Went Wrong Submitting Your Donation Please Try Again !!"
        );
    }
  }
};

const getDevoteeDetails = async (req, res, next) => {
  console.log("Requested Devotee Details by Devotee User !!");

  const userId = req.params.id;
  console.log(userId);

  try {
    const userDetails = await devoteeUserModel
      .findById(userId)
      .populate({
        path: "Address.State",
        select: "stateName",
      })
      .populate({
        path: "Address.City",
        select: "cityName",
      });
    console.log(userDetails);
    res.status(200).send(userDetails);
    console.log("User Successfully Sent !!");
  } catch (error) {
    console.log("Something Went Wrong in Getting User Data !!");
    res.status(404).send("Something Went Wrong in Getting User Data !!");
  }
};

module.exports = {
  verifyDevoteeUser,
  collectDevoteeDonation,
  getDevoteeDontaionDetails,
  getLoginID,
  getDevoteeDetails,
};
