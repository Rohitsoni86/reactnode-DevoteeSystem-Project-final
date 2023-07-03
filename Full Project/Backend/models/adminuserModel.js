const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const adminUserSchema = mongoose.Schema({
  Email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  Password: {
    type: String,
    required: true,
    min: 7,
    max: 14,
  },
  ConfirmPassword: {
    type: String,
    required: true,
    min: 7,
    max: 14,
  },
  Role: {
    type: String,
    enum: {
      values: ["admin", "devotee"],
      message: "{VALUE} is not supported",
    },
  },
});

const adminUserModel = mongoose.model("AdminDB", adminUserSchema);

module.exports = adminUserModel;
