const nodemailer = require("nodemailer");
const { storeOTP } = require("../controller/Mail.Controller");

const sendEmail = async (recv) => {
  //genereate New OTP

  const generateOTP = () => {
    // Declare a digits variable
    // which stores all digits
    let digits = "0123456789";
    let OTP = "";
    for (let i = 0; i < 4; i++) {
      OTP += digits[Math.floor(Math.random() * 10)];
    }
    console.log(OTP);
    return OTP;
  };

  const OTP = generateOTP();

  console.log("Logging Before Sending Mail");
  console.log(recv[0]);

  const mailOptions = {
    from: "testdotnet@mailtest.radixweb.net",
    to: recv[0].Email,
    subject: "Sending Login Email",
    text: `Your one time Login OTP is ${OTP} `,
  };

  const sendM = async () => {
    return new Promise((resolve, reject) => {
      // create Settings
      const transporter = nodemailer.createTransport({
        host: "mail.mailtest.radixweb.net",
        port: 465,
        auth: {
          user: "testdotnet@mailtest.radixweb.net",
          pass: "Radix@web#8",
        },
      });

      transporter.sendMail(mailOptions, async function (error, info) {
        if (error) {
          console.log(error);
          resolve(false);
        } else {
          console.log(info);

          // mailSent
          // NOW Store OTP details ::

          let userObjectForOTPVerification = {
            userEmailId: recv[0].Email,
            OTP: OTP,
            userID: recv[0]._id,
          };

          const otpStoreResult = await storeOTP(userObjectForOTPVerification); // returns true or false
          console.log("Log After OTP Storing !!");
          console.log(otpStoreResult);
          console.log("Email sent: " + info.response);
          resolve(true);
        }
      });
    });
  };

  const result = await sendM();
  console.log("LOG AFTER GETTING PROMISE !!");
  console.log(result);

  return result;
};

module.exports = { sendEmail };
