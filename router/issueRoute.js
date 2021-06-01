const express = require("express");
const router = express.Router();

const issueController = require("../controller/issueController");

router.post("/add", issueController.postIssue);
router.get("/getall", issueController.getAllIssue);
module.exports = router;
