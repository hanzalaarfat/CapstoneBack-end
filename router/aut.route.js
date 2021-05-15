const exprss = require("express");
const router = exprss.Router();
const doctorAutcontroller = require("../controller/aut.controller");

router.post("/signup", doctorAutcontroller.signup);
router.post("/login", doctorAutcontroller.login);
router.post("/update", doctorAutcontroller.updateProfile);

module.exports = router;
