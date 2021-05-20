const express = require("express");
const router = express.Router();

const hospitalController = require("../controller/hospitalConroller");

router.post("/add", hospitalController.addHospital);
router.get("/getall", hospitalController.getAllHospital);
module.exports = router;
