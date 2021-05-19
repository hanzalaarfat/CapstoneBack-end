const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Doctor = require("../model/aut.model");
const dotenv = require("dotenv");
dotenv.config();

///////////////////////////////// sigin up   /////////

exports.signup = (req, res) => {
  console.log(req.body.email);
  Doctor.findOne({ email: req.body.email }).exec((error, user) => {
    if (user)
      return res.status(400).json({
        message: "User already registered",
      });
    const { name, email, password, cpassword } = req.body;

    const doctor = new Doctor({
      name,
      email,
      password,
    });
    console.log(doctor);
    doctor.save((error, data) => {
      if (error) {
        return res.status(400).json({
          message: "Something went wrong ",
          error,
        });
      }
      if (data) {
        return res.status(201).json({
          user: data,
        });
      }
    });
  });
};

/////////////////// login ///////////

exports.login = async (req, res) => {
  let token;

  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ err: "plz fill data properly" });
  }

  Doctor.findOne({ email: email }).exec((err, user) => {
    if (err) {
      return res.status(400).json({ err });
    }
    if (user) {
      if (user.authenticate(password)) {
        const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, {
          expiresIn: "1h",
        });
        const { _id, email, name } = user;
        res.status(200).json({ token, _id, email, name });
      } else {
        return res.status(401).json({
          message: "incoreet usr or email",
        });
      }
    } else {
      return res.status(400).send({ message: "email or password wrong" });
    }
  });
};

//   const userlogin = await Doctor.findOne({ email: email });
//   if (userlogin) {
//     const isMatch = await bcrypt.compare(password, userlogin.password);

//     token = await userlogin.generateAuthToken();
//     console.log(token);

//     res.cookie("jwtoken", token, {
//       expires: new Date(Date.now() + 25892000000), /// expiry token time 1 month
//       httpOnly: true,
//     });

//     if (!isMatch) {
//       res.status(400).json({ error: "Invalid credentials : password " });
//     } else {
//       res.json({ message: "signin successful" });
//     }
//   } else {
//     res.status(400).json({ error: "Invalid Credentials : email" });
//   }
// } catch (err) {
//   console.log(err);
// }
// };

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
  try {
    const doctors = await Doctor.find({});
    if (doctors) {
      res.status(200).json({ details: doctors });
    } else {
      res.status(401).json({ err: "Not Fount doctor list" });
    }
  } catch (err) {
    console.log(err);
  }
};
