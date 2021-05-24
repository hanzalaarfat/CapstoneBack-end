const express = require("express");
const router = express.Router();
const appointmentController = require("../controller/appointment.controller");
const slotController = require("../controller/slot.controller");

router.get("/appointments", appointmentController.all);
router.get("/appointments/:drid", appointmentController.getDoctorAppoitnment);
router.get("/retrieveSlots", slotController.all);
router.post("/appointmentCreate", appointmentController.createAppoitnment);
module.exports = router;
