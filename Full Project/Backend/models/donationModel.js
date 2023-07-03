const { isRef } = require("joi");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const donationSchema = mongoose.Schema({
  UserID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Devotee",
    required: true,
  },
  YearofDonation: {
    type: Number,
    required: true,
  },
  MonthofDonation: {
    type: Number,
    required: true,
  },
  NameMonthofDonation: {
    type: String,
    required: true,
  },
  AmountPaid: {
    type: Number,
    min: 100,
    required: true,
  },
});

const donationModel = mongoose.model("Donation", donationSchema);

module.exports = donationModel;
