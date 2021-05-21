const express = require("express");
const router = express.Router();
const Hospital = require("../model/hospitalModel");

exports.addHospital = (req, res) => {
  Hospital.findOne({ hospitalName: req.body.hospitalName }).exec(
    (error, hospital) => {
      if (hospital)
        return res.status(400).json({
          message: "Hospital already registered",
        });
      const {
        hospitalName,
        specialist,
        state,
        city,
        address,
        about,
        equipment,
      } = req.body;

      const hospitalObj = new Hospital({
        hospitalName,
        specialist,
        state,
        city,
        address,
        about,
        equipment,
      });

      hospitalObj.save((error, data) => {
        if (error) {
          return res.status(400).json({
            message: "Something went wrong ",
            error,
          });
        }
        if (data) {
          return res.status(201).json({
            hospital: data,
          });
        }
      });
    }
  );
};

exports.getAllHospital = async (req, res) => {
  try {
    const hospital = await Hospital.find({});
    if (hospital) {
      let totalHospital = hospital.length;
      res.status(200).json({ totalHospital, hospital });
    } else {
      res.status(401).json({ err: "Not Fount Hospital list" });
    }
  } catch (err) {
    console.log(err);
  }
};
