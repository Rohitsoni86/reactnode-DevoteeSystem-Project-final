const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const stateSchema = new Schema({
  stateId: {
    type: Number,
    required: true,
  },
  stateName: {
    type: String,
    required: true,
  },
  countryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Country",
  },
});

const stateModel = mongoose.model("State", stateSchema);

module.exports = stateModel;
