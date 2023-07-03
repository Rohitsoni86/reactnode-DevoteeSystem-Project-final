const otpModel = require("../models/otpVerificationModel");
const devoteeUserModel = require("../models/devoteeUserModel");
const adminUserModel = require("../models/adminuserModel");

const jwt = require("jsonwebtoken");

const { generateToken } = require("../middleware/generateToken");

const storeOTP = async (userObj) => {
  console.log("Storing OTP Request in DB !!");
  try {
    const otpStoreResult = await otpModel.create(userObj);
    console.log("OTP STORED SUCCESS !!");
    console.log(otpStoreResult);
    return true;
  } catch (error) {
    console.log("Something Went Wrong in storing Otp !!");
    return false;
  }
};

const verifyUserOTP = async (req, res, next) => {
  const userData = req.body;
  console.log(userData);

  console.log("Finding user OTP from DB !!");
  try {
    const checkOTP = await otpModel
      .find({ OTP: userData.OTP })
      .sort({ _id: -1 })
      .limit(1); // get the latest OTP

    console.log(checkOTP);
    //if User OTP There Then

    //Generate New Token And Send it To user

    if (checkOTP.length) {
      console.log("User Verified Success !!");
      //find user and get Payload

      try {
        const AdminDetails = await adminUserModel.findOne({
          Email: checkOTP[0].userEmailId,
        });
        console.log(`is it Admin ?  ${AdminDetails}`);
        const userDetails = await devoteeUserModel.findOne({
          Email: checkOTP[0].userEmailId,
        });
        console.log(`is it User ? ${userDetails}`);

        //generate New Token
        if (AdminDetails !== null || userDetails !== null) {
          // if both Null then why need to run inner Functionality
          if (AdminDetails !== null) {
            console.log("User Admin Verified !! \n");
            const tokenG = generateToken(AdminDetails); //generate Token With User Details
            console.log("Generated Token Success !! \n");
            console.log(tokenG);
            res.status(200).send({ Token: `${tokenG}`, Flag: 86 }); // Flag:86 for Admin && Flag:96 for Devotee User
            console.log("Token Sent !!");
          } else if (userDetails !== null) {
            console.log("User Devotee Verified !! \n");
            const tokenG = generateToken(userDetails); //generate Token With User Details
            console.log("Generated Token Success !! \n");
            console.log(tokenG);
            res.status(200).send({ Token: `${tokenG}`, Flag: 96 }); // Flag:86 for Admin && Flag:96 for Devotee User
            console.log("Token Sent !!");
          } else {
            console.log(
              "Something Went Wrong in Fetching User Data not Able to Generate Token !!"
            );
            res
              .status(404)
              .send(
                "Something Went Wrong in Fetching User Data not Able to Generate Token !!"
              );
          }
        }
      } catch (error) {
        console.log(error);
        console.log(
          "Something Went Wrong in Fetching User Data not Able to Generate Token !!"
        );
        res
          .status(404)
          .send(
            "Something Went Wrong in Fetching User Data not Able to Generate Token !!"
          );
      }
    }
    // If OTP Does Not Exists then Proceed
    else {
      console.log("User Not Verified Please Enter Correct OTP !!");
      res.status(500).send("User Not Verified Please Enter Correct OTP !!");
    }
  } catch (error) {
    console.log("Error ::: Finding user OTP from DB !! ");
  }
};

module.exports = { storeOTP, verifyUserOTP };
