const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../model/userAuth.model");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

exports.signup = async (req, res) => {
  const { name, email, password, cpassword } = req.body;
  if ((!name || !email, !password)) {
    return res.status(422).json({ err: "plz filled properly" });
  }

  ///////////////////////////////// async await or  /////////
  try {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      console.log(userExist);
      return res.status(422).json({ error: "Email alreday Exist" });
    }
    const user = new User({
      name,
      email,
      password,
    });
    /// pre save password hashing in user schema
    const userRegister = await user.save();
    if (userRegister) {
      res.status(201).json({ message: "User resgister successfuly" });
    } else {
      res.status(500).json({ error: "Faild to register" });
    }
  } catch (err) {
    console.log(err);
  }
};

// exports.login = async (req, res) => {
//   try {
//     let token;
//     const { email, password } = req.body;
//     if (!email || !password) {
//       return res.status(422).json({ err: "plz fill data properly" });
//     }
//     const userlogin = await User.findOne({ email: email });
//     if (userlogin) {
//       const isMatch = await bcrypt.compare(password, userlogin.password);

//       token = await userlogin.generateAuthToken();
//       console.log(token);

//       res.cookie("jwtoken", token, {
//         expires: new Date(Date.now() + 25892000000), /// expiry token time 1 month
//         httpOnly: true,
//       });

//       if (!isMatch) {
//         res.status(400).json({ error: "Invalid credentials : password " });
//       } else {
//         res.json({ message: "signin successful" });
//       }
//     } else {
//       res.status(400).json({ error: "Invalid Credentials : email" });
//     }
//   } catch (err) {
//     console.log(err);
//   }
// };

exports.login = async (req, res) => {
  let token;

  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ err: "plz fill data properly" });
  }

  User.findOne({ email: email }).exec((err, user) => {
    if (err) {
      return res.status(400).json({ err });
    }
    if (user) {
      if (user.authenticate(password)) {
        const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, {
          expiresIn: "24h",
        });
        const { _id, email, name } = user;
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
  const { phone, state, city, address, id, name } = req.body;
  const story = await User.findOneAndUpdate(
    { _id: id },
    {
      $set: {
        name: name,
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

exports.singleUserData = (req, res) => {
  console.log(req.params.id);
  User.findOne({ _id: req.params.id }).exec((err, user) => {
    if (err) {
      return res.status(400).json({ err });
    } else {
      res.status(200).json({ data: user });
    }
  });
};

exports.getallUser = async (req, res) => {
  try {
    const user = await User.find({});
    res.json(user);
  } catch (err) {
    console.log(err);
  }
};
