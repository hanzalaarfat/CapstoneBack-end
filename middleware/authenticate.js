const jwt = require("jsonwebtoken");
const User = require("../model/userAuth.model");

exports.requireSigninAdmin = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    const admin = jwt.verify(token, process.env.SECRET_KEY_ADMIN);
    req.user = admin;
    console.log("admin .......", admin);
  } else {
    return res.status(400).json({ message: "Authorization required" });
  }
  next();
};

exports.requireSignin = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, process.env.SECRET_KEY);
    req.user = user;
    console.log("user .......", user);
  } else {
    return res.status(400).json({ message: "Authorization required" });
  }
  next();
};

exports.requireSigninDoctor = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    const doctor = jwt.verify(token, process.env.SECRET_KEY_DOCTOR);
    req.doctor = doctor;
    console.log("doctor .......", doctor);
  } else {
    return res.status(400).json({ message: "Authorization required" });
  }
  next();
};
// exports.userMiddleware = (req, res, next) => {
//   if (req.user !== "user") {
//     return res.status(400).json({ message: "User Access denied" });
//   }
//   next();
// };

// exports.doctorMiddleware = (req, res, next) => {
//   if (req.doctor !== "doctor") {
//     return res.status(400).json({ message: "Doctor Access denied" });
//   }
//   next();
// };

// module.exports = Authenticate;
