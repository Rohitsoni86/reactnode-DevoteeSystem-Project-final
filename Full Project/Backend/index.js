console.log("Start !!");
require("dotenv").config();
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const adminRoutes = require("./routes/adminRoutes");
const devoteeRoutes = require("./routes/devoteeRoutes");
app.use(bodyParser.json());
const mongoose = require("mongoose");
const cors = require("cors");

app.use(cors());

const greetUser = (req, res, next) => {
  res.status(200).send("Welcome To Your Application !!!");
};

mongoose
  .connect("mongodb://127.0.0.1:27017/DevoteeCenter")
  .then(() => console.log("Connected To DB!"))
  .catch((err) => {
    console.log("Error Connecting To DB !!");
  });

app.get("/", greetUser);

app.use(devoteeRoutes);
app.use(adminRoutes);
app.listen(3000, () => {
  console.log("Server Started !!");
});
