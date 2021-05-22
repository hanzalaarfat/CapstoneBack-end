const express = require("express");
const router = express.Router();
const adminAutcontroller = require("../controller/adminController");
const hospitalAutController = require("../controller/hospitalConroller");
const doctorAutcontroller = require("../controller/aut.controller");
const userAutcontroller = require("../controller/userAut.controller");
const { requireSigninAdmin } = require("../middleware/authenticate");

const {
  validateSignupRequest,
  validateSigninRequest,
  isRequestValidated,
} = require("../validator/auth.valditor");

router.post(
  "/signup",
  validateSignupRequest,
  isRequestValidated,
  adminAutcontroller.signup
);
router.post(
  "/login",
  validateSigninRequest,
  isRequestValidated,
  adminAutcontroller.login
);
router.post("/update", requireSigninAdmin, adminAutcontroller.updateProfile);
// router.get("/getall", adminAutcontroller.getAllAdmin);
router.get(
  "/allhospital",
  requireSigninAdmin,
  hospitalAutController.getAllHospital
);
router.get("/alldoctor", requireSigninAdmin, doctorAutcontroller.getAllDoctor);
router.get("/alluser", requireSigninAdmin, userAutcontroller.getallUser);

module.exports = router;
