const express = require("express");
const router = express.Router();
const storage = require("../middleware/storage");

const doctorAutcontroller = require("../controller/aut.controller");
const {
  requireSigninDoctor,
  doctorMiddleware,
} = require("../middleware/authenticate");

const {
  validateSignupRequest,
  validateSigninRequest,
  isRequestValidated,
} = require("../validator/auth.valditor");

router.post(
  "/signup",
  validateSignupRequest,
  isRequestValidated,
  doctorAutcontroller.signup
);
router.post(
  "/login",
  validateSigninRequest,
  isRequestValidated,
  doctorAutcontroller.login
);
router.post("/update", requireSigninDoctor, doctorAutcontroller.updateProfile);
router.get("/alldoctor", requireSigninDoctor, doctorAutcontroller.getAllDoctor);
router.get("/doctor/:slug", doctorAutcontroller.getBySlug);
router.post("/status", requireSigninDoctor, doctorAutcontroller.DoctorStatus);
router.post(
  "/addprescription",
  storage.uploadS3.array("prescription"),
  requireSigninDoctor,
  doctorAutcontroller.DoctorAddPrecription
);
router.get(
  "/getprescription/:id",
  requireSigninDoctor,
  doctorAutcontroller.DoctorGetPrecription
);
router.get(
  "/available",
  requireSigninDoctor,
  doctorAutcontroller.getAvailableDoctor
);
router.get(
  "/search/:specialist",
  requireSigninDoctor,
  doctorAutcontroller.getSearchDoctor
);

// router.post(
//   "/special",
//   requireSigninDoctor,
//   doctorAutcontroller.getSpecialistDoctor
// );

module.exports = router;
