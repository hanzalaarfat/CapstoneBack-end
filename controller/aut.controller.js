const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Doctor = require("../model/aut.model");

///////////////////////////////// sigin up   /////////

exports.signup = async (req, res) => {
  const { name, email, password, cpassword } = req.body;
  if ((!name || !email, !password || !cpassword)) {
    return res.status(422).json({ err: "plz filled properly" });
  }

  ///////////////////////////////// async await or  /////////
  try {
    const doctorExist = await Doctor.findOne({ email: email });
    if (doctorExist) {
      console.log(doctorExist);
      return res.status(422).json({ error: "Email alreday Exist" });
    }
    const doctor = new Doctor({
      name,
      email,
      password,
      cpassword,
    });
    /// pre save password hashing in user schema
    const doctorRegister = await doctor.save();
    if (doctorRegister) {
      res.status(201).json({ message: "doctor resgister successfuly" });
    } else {
      res.status(500).json({ error: "Faild to register" });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.login = async (req, res) => {
  try {
    let token;
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(422).json({ err: "plz fill data properly" });
    }
    const userlogin = await Doctor.findOne({ email: email });
    if (userlogin) {
      const isMatch = await bcrypt.compare(password, userlogin.password);

      token = await userlogin.generateAuthToken();
      console.log(token);

      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 25892000000), /// expiry token time 1 month
        httpOnly: true,
      });

      if (!isMatch) {
        res.status(400).json({ error: "Invalid credentials : password " });
      } else {
        res.json({ message: "signin successful" });
      }
    } else {
      res.status(400).json({ error: "Invalid Credentials : email" });
    }
  } catch (err) {
    console.log(err);
  }
};

///////////////////////////////// doctor Update Profile  /////////

exports.updateProfile = async (req, res) => {
  const {
    phone,
    specialist,
    state,
    city,
    address,
    days,
    timing,
    id,
  } = req.body;
  const story = await Doctor.findOneAndUpdate(
    { _id: id },
    {
      $set: {
        phone: phone,
        city: city,
        specialist: specialist,
        state: state,
        address: address,
        days: days,
        timing: timing,
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

exports.getAllDoctor = async (req, res) => {
  const doctors = await Doctor.find();
};
