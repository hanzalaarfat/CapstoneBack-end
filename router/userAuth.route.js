const exprss = require("express");
const router = exprss.Router();
const userAutcontroller = require("../controller/userAut.controller");
const doctorAutcontroller = require("../controller/aut.controller");
const hospitalController = require("../controller/hospitalConroller");
const donateController = require("../controller/donateController");
// const authenticate = require("../middleware/authenticate");

const { requireSignin } = require("../middleware/authenticate");

const {
  validateSignupRequest,
  validateSigninRequest,
  isRequestValidated,
} = require("../validator/auth.valditor");

router.post(
  "/signup",
  validateSignupRequest,
  isRequestValidated,
  userAutcontroller.signup
);
router.post(
  "/login",
  validateSigninRequest,
  isRequestValidated,
  userAutcontroller.login
);
router.get("/alluser", userAutcontroller.getallUser);
router.post("/update", requireSignin, userAutcontroller.updateProfile);
router.get("/data/:id", requireSignin, userAutcontroller.singleUserData);
router.get("/available", requireSignin, doctorAutcontroller.getAvailableDoctor);
router.get("/alldoctor", requireSignin, doctorAutcontroller.getAllDoctor);
router.get("/allhospital", requireSignin, hospitalController.getAllHospital);
router.post("/donate", requireSignin, donateController.ReciveDonateInPostReq);

// router.post("/addamount", donateController.addamount);

router.get(
  "/amount",
  requireSignin,
  donateController.getAllDonateOrgWiseDetails
);
// router.post("/special", requireSignin, doctorAutcontroller.getSpecialistDoctor);
module.exports = router;
