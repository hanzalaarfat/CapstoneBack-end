const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
var cors = require("cors");
const doctorRoutes = require("./router/aut.route");
const userRoutes = require("./router/userAuth.route");
const appointmentRoutes = require("./router/appointment.route");

dotenv.config();
require("./db/con");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("hello world");
});
app.use("/doctor", doctorRoutes);
app.use("/user", userRoutes);
app.use("/appointment", appointmentRoutes);

app.use(function (req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});
app.listen(process.env.PORT, () => {
  console.log(`sarver started at port ${process.env.PORT} `);
});
