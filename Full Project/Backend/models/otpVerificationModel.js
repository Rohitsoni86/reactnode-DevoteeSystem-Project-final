const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const otpSchema = new Schema({
  userEmailId: {
    type: String,
    required: true,
  },
  OTP: {
    type: String,
    required: true,
    min: 4,
  },
  userID: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const otpModel = mongoose.model("OTP", otpSchema);

module.exports = otpModel;
