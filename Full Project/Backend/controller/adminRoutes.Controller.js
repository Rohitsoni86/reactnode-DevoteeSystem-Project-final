const adminUserModel = require("../models/adminuserModel");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const { sendEmail } = require("../middleware/sendMailToAdmin");

//devotee

const devoteeUserModel = require("../models/devoteeUserModel");
const donationModel = require("../models/donationModel");
const mongoose = require("mongoose");
// CREATE USER ADMIN

const createAdmin = async (req, res, next) => {
  const userDetails = req.body;
  console.log(userDetails);

  // JOI VALIDATION

  const registerAdminUserSchema = Joi.object({
    Email: Joi.string().email().lowercase().required(),
    Password: Joi.string().min(7).required().strict(),
    ConfirmPassword: Joi.string()
      .valid(Joi.ref("Password"))
      .required()
      .strict(),
    Role: Joi.string().lowercase().required(),
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

    // USUAL VALIDATION

    const checkUser = await adminUserModel.find({ Email: userDetails.Email });

    console.log(checkUser.length);

    //if User Already There Then
    if (checkUser.length) {
      res.status(503).send("User Already Exists !! \n Try Login ");
    }
    // If User Does Not Exists then Proceed
    else {
      try {
        console.log("Creating New User !!");

        // HASING PASSWORD
        bcrypt.hash(userDetails.Password, 12, async function (err, hash) {
          if (err) {
            console.log("Internal Server Error !! \n Please Try Again !!");
            console.log(err);
            res
              .status(500)
              .send("Internal Server Error !! \n Please Try Again !!");
          } else {
            userDetails.Password = hash;
            userDetails.ConfirmPassword = hash;
            console.log(userDetails);
            const newUser = await adminUserModel.create(userDetails);
            newUser.save();
            console.log("Added New User To DB !!");
            res.status(200).send("New User Added To DB !!");
          }
        });
      } catch (error) {
        console.log("Something Went Wrong Creating New User !!");
        res
          .status(500)
          .send(
            "Internal Server Error \n Something Went Wrong Creating New User !!  Try Again !! "
          );
      }
    }
  }
};

// USER Admin Login Verification !!!

const verifyUser = async (req, res, next) => {
  const userDetails = req.body;
  console.log(userDetails);
  console.log("Login User Req !");
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

    const User = await adminUserModel.find({ Email: userDetails.Email });
    console.log(User);
    console.log(User.length);
    //if User Exists There Then

    if (User.length) {
      try {
        console.log("User Login Request !!");
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

// Creating New Devotee

const createNewDevotee = async (req, res, next) => {
  const userDetails = req.body;
  console.log(userDetails);

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

    // USUAL VALIDATION

    const checkUser = await devoteeUserModel.find({ Email: userDetails.Email });

    console.log(checkUser.length);

    //if User Already There Then
    if (checkUser.length) {
      res.status(503).send("User Already Exists !! \n Try Login ");
    }
    // If User Does Not Exists then Proceed
    else {
      try {
        console.log("Creating New User !!");

        // SUBMIT LOGIN COME HERE !!!!

        // Creating Dynamic User ID ::

        const generateUserLoginId = (user) => {
          let newDate = new Date(user.InitiationDate);
          let yearOfinitiation = newDate.getFullYear();
          let firstTwoCharsFrmFName = user.FirstName.slice(0, 2);
          let firstTwoCharsFrmLName = user.LastName.slice(0, 2);
          let monthOfinitiation = newDate.getMonth() + 1;

          const userIDG = `${yearOfinitiation}${firstTwoCharsFrmFName}${firstTwoCharsFrmLName}${monthOfinitiation}universaldevotee.com`;

          console.log("User Id Generated Successfully !!");

          console.log(userIDG);

          return userIDG;
        };

        const NewUserLoginId = generateUserLoginId(userDetails);
        console.log(NewUserLoginId);

        // Generate New Password For User

        const PasswordGenerator = (user) => {
          let first4CharsFrmFName = user.FirstName.slice(0, 4);
          let newDate = new Date(user.InitiationDate);
          let yearOfinitiation = newDate.getFullYear();
          let generatedPass = `${first4CharsFrmFName}@${yearOfinitiation}De`;

          console.log("Password Generated Success !!");
          console.log(generatedPass);

          return generatedPass;
        };

        const NewPasswordGenerated = PasswordGenerator(userDetails);
        console.log(NewPasswordGenerated);

        userDetails.Password = NewPasswordGenerated;
        userDetails.UserLoginId = NewUserLoginId;

        // HASING PASSWORD
        bcrypt.hash(userDetails.Password, 12, async function (err, hash) {
          if (err) {
            console.log("Internal Server Error !! \n Please Try Again !!");
            console.log(err);
            res
              .status(500)
              .send("Internal Server Error !! \n Please Try Again !!");
          } else {
            try {
              userDetails.Password = hash;
              console.log(userDetails);
              const newUser = await devoteeUserModel.create(userDetails);
              newUser.save();
              console.log("Added New User To DB !!");
              res.status(200).send("New User Added To DB !!");

              // We can Now Send Email To The User By calling MiddleWare
            } catch (err) {
              console.log("Something Went Wrong Creating New User !!");
              console.log(err);
              res.status(500).send(err);
            }
          }
        });
      } catch (error) {
        console.log("Something Went Wrong Creating New User !!");
        console.log(error);
        res
          .status(500)
          .send(
            "Internal Server Error \n Something Went Wrong Creating New User !!  Try Again !! "
          );
      }
    }
  }
};

const getDonationRecord = async (req, res, next) => {
  console.log("Requested Donation Details Admin User !!");
  try {
    const userDetails = await donationModel.aggregate([
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
    console.log(userDetails);
    res.status(200).send(userDetails);
    console.log("User Details Successfully Sent !!");
  } catch (error) {
    console.log("Something Went Wrong in Getting User Data !!");
    console.log(error);
    res.status(404).send("Something Went Wrong in Getting User Data !!");
  }
};

const getUserNotPaidMonth = async (req, res, next) => {
  //get currentMonth
  const m = new Date();
  let currentMonth = m.getMonth() + 1;

  console.log(
    "Requested Donation Details Admin User who not Paid For Current Month !!"
  );
  try {
    // find the users Who Paid For current Month
    const userDetailsFromDonation = await donationModel.aggregate([
      { $match: { MonthofDonation: currentMonth } },
      {
        $group: {
          _id: {
            UserID: "$UserID",
          },
        },
      },
    ]);

    console.log(userDetailsFromDonation);

    //get All Users
    const allUsers = await devoteeUserModel.find();

    // console.log(allUsers);

    //Extract User Id from Paid
    let userswhoPaidForCuM = userDetailsFromDonation.map((ele) => {
      return ele._id.UserID.toString();
    });

    console.log(userswhoPaidForCuM);

    //Extract userid all users
    let allUsersId = allUsers.map((ele) => {
      return ele._id.toString();
    });

    console.log(allUsersId);

    //Filter
    const listofUsersNotPaid = allUsersId.filter(
      (item) => !userswhoPaidForCuM.includes(item)
    );

    console.log(listofUsersNotPaid);

    //Function That fetch User Data
    async function getDF(objectid) {
      console.log("Getting User Information !!");
      let userD = await devoteeUserModel.findById(objectid.toString());
      return userD;
    }

    // Promise Wait For all To Set Data
    const UserAllDetails = Promise.all(
      listofUsersNotPaid.map((ele, index) => {
        console.log(`Element To String :: ${ele.toString()}`);
        const detailsss = getDF(ele.toString());
        return detailsss;
      })
    );

    //Send Data
    UserAllDetails.then((data) => {
      console.log(data);
      res.status(200).send(data);
    }).catch((err) => {
      console.log(err);
      res.status(500).send(`Error Fetching Dataa !! ${err}`);
    });

    console.log("User Details Successfully Sent !!");
  } catch (error) {
    console.log("Something Went Wrong in Getting User Data !!");
    console.log(error);
    res.status(404).send("Something Went Wrong in Getting User Data !!");
  }
};

module.exports = {
  createAdmin,
  verifyUser,
  createNewDevotee,
  getDonationRecord,
  getUserNotPaidMonth,
};
