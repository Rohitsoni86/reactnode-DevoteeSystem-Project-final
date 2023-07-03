const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const citySchema = new Schema({
  cityId: {
    type: Number,
    required: true,
  },
  cityName: {
    type: String,
    required: true,
  },
  stateId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "State",
  },
});

const cityModel = mongoose.model("City", citySchema);

module.exports = cityModel;
