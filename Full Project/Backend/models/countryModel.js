const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const countrySchema = new Schema({
  countryId: {
    type: Number,
    required: true,
  },
  countryName: {
    type: String,
    required: true,
  },
  sortName: {
    type: String,
    required: true,
  },
});

const countryModel = mongoose.model("Country", countrySchema);

module.exports = countryModel;
