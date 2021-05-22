const express = require("express");
const bcrypt = require("bcryptjs");
const Admin = require("../model/adminModel");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

exports.signup = async (req, res) => {
  const { name, email, password, secret } = req.body;
  if ((!name || !email, !password, !secret)) {
    return res.status(422).json({ err: "plz filled properly" });
  }

  ///////////////////////////////// async await or  /////////
  try {
    const adminExist = await Admin.findOne({ email: email });
    if (adminExist) {
      console.log(adminExist);
      return res.status(422).json({ error: "Email alreday Exist" });
    }

    if (process.env.adminSecret === secret) {
      const admin = new Admin({
        name,
        email,
        password,
      });
      const adminRegister = await admin.save();
      if (adminRegister) {
        res.status(201).json({ message: "Admin resgister successfuly" });
      } else {
        res.status(500).json({ error: "Faild to register" });
      }
    } else {
      res.status(500).json({ error: "Secret key required to register" });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.login = async (req, res) => {
  let token;

  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ err: "plz fill data properly" });
  }

  Admin.findOne({ email: email }).exec((err, admin) => {
    if (err) {
      return res.status(400).json({ err });
    }
    if (admin) {
      if (admin.authenticate(password)) {
        const token = jwt.sign({ _id: admin._id }, process.env.SECRET_KEY_ADMIN, {
          expiresIn: "24h",
        });
        const { _id, email, name } = admin;
        res.status(200).json({ token, _id, email, name });
      } else {
        return res.status.json({
          message: "incoreet usr or email",
        });
      }
    } else {
      return res.status(400).send({ message: "email or password wrong" });
    }
  });
};

exports.updateProfile = async (req, res) => {
  const { phone, state, city, address, id } = req.body;
  const story = await Admin.findOneAndUpdate(
    { _id: id },
    {
      $set: {
        phone: phone,
        city: city,
        state: state,
        address: address,
      },
    },
    { new: true }
  )
    .exec()
    .then((result) => {
      console.log(result);
      res.status(200).json({ message: result });
    })
    .catch((e) => {
      console.log(e);
      res.status(400).json({ error: e });
    });
};
// got some error
// exports.getallAdmin = async (req, res) => {
//   try {
//     const admin = await Admin.find({});

//     if (admin) {
//       res.status(201).json({ data: admin });
//     } else {
//       res.status(500).json({ message: "Not foud Admin" });
//     }
//   } catch (err) {
//     console.log(err);
//     res.status(401).json({ err: err });
//   }
// };
