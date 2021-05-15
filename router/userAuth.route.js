const exprss = require("express");
const router = exprss.Router();
const userAutcontroller = require("../controller/userAut.controller");

router.post("/signup", userAutcontroller.signup);
router.post("/login", userAutcontroller.login);
router.post("/update", userAutcontroller.updateProfile);
router.get("/:id/edit", userAutcontroller.edit);

module.exports = router;
