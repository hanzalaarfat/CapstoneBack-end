const exprss = require("express");
const router = exprss.Router();
const userAutcontroller = require("../controller/userAut.controller");
const doctorAutcontroller = require("../controller/aut.controller");

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
router.get("/:id/edit", requireSignin, userAutcontroller.edit);
router.get("/available", requireSignin, doctorAutcontroller.getAvailableDoctor);

// router.post("/special", requireSignin, doctorAutcontroller.getSpecialistDoctor);
module.exports = router;
