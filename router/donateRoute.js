const express = require("express");
const router = express.Router();

const donateController = require("../controller/donateController");

router.post("/add", donateController.addDonateOrg);
router.post("/singleorg", donateController.getSingleOrgDetails);

router.post("/emergency", donateController.emergency);
router.get("/getall", donateController.getAllOrg);
module.exports = router;
