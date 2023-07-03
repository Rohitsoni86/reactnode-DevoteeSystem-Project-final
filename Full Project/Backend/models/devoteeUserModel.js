const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const devoteeUserSchema = mongoose.Schema({
  FirstName: {
    type: String,
    required: true,
    lowercase: true,
    min: 3,
  },
  MiddleName: {
    type: String,
    lowercase: true,
    default: "",
    min: 3,
  },
  LastName: {
    type: String,
    required: true,
    lowercase: true,
    min: 3,
  },
  ProfilePhoto: {
    type: String,
    default: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
  },
  UserLoginId: {
    type: String,
    required: true,
    min: 3,
  },
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
  Role: {
    type: String,
    default: "devotee",
  },
  Nationality: {
    type: String,
    required: true,
    lowercase: true,
  },
  Phone: {
    type: String,
    min: 10,
  },
  Address: {
    FlatNumber: {
      type: Number,
      required: true,
      min: 1,
    },
    Area: {
      type: String,
    },
    State: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "State",
      required: true,
    },
    City: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "City",
      required: true,
    },
    Pincode: {
      type: String,
      min: 2,
      max: 6,
    },
  },
  InitiationDate: {
    type: Date,
    min: "2023-01-04",
    default: Date.now(),
  },
});

const devoteeUserModel = mongoose.model("Devotee", devoteeUserSchema);

module.exports = devoteeUserModel;
