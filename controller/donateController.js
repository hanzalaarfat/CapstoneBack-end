const express = require("express");
const router = express.Router();
const DonateOrg = require("../model/donateModel");
const GetDonate = require("../model/getdonationModel");
const dotenv = require("dotenv");
dotenv.config();

let startDate = new Date();
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const day = startDate.getDate();
const month = months[startDate.getMonth()]; // 0 to 11 index
const month1 = startDate.getMonth();
const year = startDate.getFullYear();
const fullDate = day + " " + month + " " + year;
const currentDate = month1 + 1 + "/" + day + "/" + year;

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

//////////////// get all organization Name /////////////////

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

exports.emergency = async (req, res) => {
  const { emergency, bank, ac, ifsc, drequired, draised, orgName } = req.body;

  if (!emergency || !bank || !ac || !drequired || !draised || !orgName) {
    return res.status(422).json({ err: "plz fill data properly" });
  }
  const story = await DonateOrg.findOneAndUpdate(
    { orgName: orgName },
    {
      $set: {
        emergency: emergency,
        bank: bank,
        ac: ac,
        ifsc: ifsc,
        drequired: drequired,
        draised: draised,
      },
    },
    { new: true }
  )
    .exec()
    .then((result) => {
      console.log(result);
      res.status(200).json({ data: result });
    })
    .catch((e) => {
      console.log(e);
      res.status(400).json({ error: e });
    });
};

///////////////////////////// recivee donate from user post request /////////////////////

exports.ReciveDonateInPostReq = (req, res) => {
  const { name, orgId, userId, email, phone, amount } = req.body;
  console.log(orgId);
  if (!name || !email || !phone || !amount) {
    return res.status(422).json({ err: "plz filled properly" });
  }
  let draised = 0;
  // var requestBody = req.body;
  var getdonation = new GetDonate({
    orgId,
    userId,
    name,
    email,
    phone,
    date: currentDate,
    amount,
  });
  getdonation.save(async (error, data) => {
    if (error) {
      return res.status(400).json({
        message: "Something went wrong ",
        error,
      });
    }
    if (data) {
      // return res.status(200).json({
      //   data: data,
      // });
      ///add amount  draised  field in  DonateOrg model
      console.log("Amount type", typeof amount);
      try {
        const data = await DonateOrg.findOne({ _id: orgId });
        if (data) {
          console.log(data.draised);
          deraisd = data.draised + amount;
          console.log(draised);
          const story = await DonateOrg.findOneAndUpdate(
            { _id: orgId },
            {
              $set: {
                draised: deraisd,
              },
            },
            { new: true }
          )
            .exec()
            .then((result) => {
              console.log(result);
              res.status(200).json({ data: result });
            })
            .catch((e) => {
              console.log(e);
              res.status(400).json({ error: e });
            });
        } else {
          res.status(401).json({ err: "Not Found data" });
        }
      } catch (err) {
        console.log(err);
        res.status(401).json({ err: "Not Found data" });
      }
    }
  });
};

///////////////////////// show sigle Orgnizatin delatils//////////////////

exports.getSingleOrgDetails = async (req, res) => {
  const orgId = req.body.orgId;
  try {
    const data = await DonateOrg.find({ _id: orgId });
    if (data) {
      res.status(200).json({ data });
    } else {
      res.status(401).json({ err: "Not Found data" });
    }
  } catch (err) {
    console.log(err);
    res.status(401).json({ err: "Not Found data" });
  }
};

////////////////////

exports.getAllDonateOrgWiseDetails = async (req, res) => {
  const orgId = req.body.orgId;
  try {
    const data = await GetDonate.find({});
    if (data) {
      res.status(200).json({ data });
    } else {
      res.status(401).json({ err: "Not Found data" });
    }
  } catch (err) {
    console.log(err);
    res.status(401).json({ err: "Not Found data" });
  }
};

//////////////// update raised amount donate org model me///////

// exports.addamount = async (req, res) => {
//   const { orgId, amount } = req.body;
//   let draised = 0;
//   console.log(amount);

//   try {
//     const data = await DonateOrg.findOne({ _id: orgId });
//     if (data) {
//       console.log(data.draised);
//       deraisd = data.draised + amount;
//       console.log(draised);
//       const story = await DonateOrg.findOneAndUpdate(
//         { _id: orgId },
//         {
//           $set: {
//             draised: deraisd,
//           },
//         },
//         { new: true }
//       )
//         .exec()
//         .then((result) => {
//           console.log(result);
//           res.status(200).json({ data: result });
//         })
//         .catch((e) => {
//           console.log(e);
//           res.status(400).json({ error: e });
//         });
//     } else {
//       res.status(401).json({ err: "Not Found data" });
//     }
//   } catch (err) {
//     console.log(err);
//     res.status(401).json({ err: "Not Found data" });
//   }
// };
