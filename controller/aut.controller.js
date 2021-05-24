const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Doctor = require("../model/aut.model");

const Drcategory = require("../model/drCategoryModel");
const slugify = require("slugify");
const shortid = require("shortid");
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
    const { name, email, password, category } = req.body;

    const doctor = new Doctor({
      name,
      slug: slugify(name),
      email,
      password,
      category,
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
        return res.status(200).json({
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
        const token = jwt.sign(
          { _id: user._id },
          process.env.SECRET_KEY_DOCTOR,
          {
            expiresIn: "24h",
          }
        );
        const { _id, email, name } = user;
        res.status(200).json({ token, _id, email, name });
      } else {
        return res.status(400).json({
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

///////////////// listing of all Doctors ///////////

exports.getAllDoctor = async (req, res) => {
  try {
    const doctors = await Doctor.find({});
    if (doctors) {
      // console.log("doctor count :", doctors.length);
      let totalDoctor = doctors.length;
      res.status(200).json({ totalDoctor: totalDoctor, details: doctors });
    } else {
      res.status(401).json({ err: "Not Fount doctor list" });
    }
  } catch (err) {
    console.log(err);
  }
};

/////////////////     ///////////

exports.getBySlug = (req, res) => {
  const { slug } = req.params;
  Drcategory.findOne({ slug: slug })
    .select("_id type")
    .exec((error, category) => {
      if (error) {
        return res.status(400).json({ error });
      }

      if (category) {
        Doctor.find({ category: category._id }).exec((error, doctor) => {
          if (error) {
            return res.status(400).json({ error });
          } else {
            res.status(200).json({ doctor });
          }
        });
      }
    });
};

/////////////////doctor status updates ///////////

exports.DoctorStatus = async (req, res) => {
  const id = req.body.id;
  let bol = req.body.bol;
  const story = await Doctor.findOneAndUpdate(
    { _id: id },
    {
      $set: {
        available: bol,
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

/////////// available doctor ///////

exports.getAvailableDoctor = async (req, res) => {
  try {
    const doctors = await Doctor.find({ available: true });
    if (doctors) {
      // console.log("doctor count :", doctors.length);
      let totalDoctor = doctors.length;
      res.status(200).json({ totalDoctor: totalDoctor, details: doctors });
    } else {
      res.status(401).json({ err: "Not Fount doctor list" });
    }
  } catch (err) {
    console.log(err);
  }
};

//////////////doctor searh by specialist //////

// exports.getSpecialistDoctor = async (req, res) => {
//   let specialist = req.body.specialist;
//   console.log(specialist);
//   try {
//     const doctors = await Doctor.find({ specialist: specialist });
//     if (doctors) {
//       // console.log("doctor count :", doctors.length);
//       let totalDoctor = doctors.length;
//       res.status(200).json({ totalDoctor: totalDoctor, details: doctors });
//     } else {
//       res.status(401).json({ err: "Not Fount doctor list" });
//     }
//   } catch (err) {
//     console.log(err);
//   }
// };
