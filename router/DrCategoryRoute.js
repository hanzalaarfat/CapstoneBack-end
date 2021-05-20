const express = require("express");
const router = express.Router();
const Drcategory = require("../controller/categoryController");

router.post("/addcategory", Drcategory.addCategory);
router.get("/getcategory", Drcategory.getCategories);
module.exports = router;
