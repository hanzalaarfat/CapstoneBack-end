const express = require("express");
const router = express.Router();
const DonateOrg = require("../model/donateModel");

exports.addDonateOrg = (req, res) => {
  DonateOrg.findOne({ orgName: req.body.orgName }).exec((error, org) => {
    if (org)
      return res.status(400).json({
        message: "Organazation already registered",
      });
    const { orgName, state, city, address, about, phone } = req.body;

    const donateorg = new DonateOrg({
      orgName,
      state,
      phone,
      city,
      address,
      about,
    });

    donateorg.save((error, data) => {
      if (error) {
        return res.status(400).json({
          message: "Something went wrong ",
          error,
        });
      }
      if (data) {
        return res.status(201).json({
          data: data,
        });
      }
    });
  });
};

exports.getAllOrg = async (req, res) => {
  try {
    const donateorg = await DonateOrg.find({});
    if (donateorg) {
      let totalOrganaization = donateorg.length;
      res.status(200).json({ totalOrganaization, donateorg });
    } else {
      res.status(401).json({ err: "Not Found Organaization list" });
    }
  } catch (err) {
    console.log(err);
  }
};
