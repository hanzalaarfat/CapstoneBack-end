// const { Appointment, Slot } = Model;
const Appointment = require("../model/appointment.model");
// const Slot = require("../model/slot.model");
const Doctor = require("../model/aut.model");
console.log(Appointment);
const dotenv = require("dotenv");
dotenv.config();
const Vonage = require("@vonage/server-sdk"); // for send messaging
let startDate = new Date();
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const day = startDate.getDate();
const month = months[startDate.getMonth()]; // 0 to 11 index
const month1 = startDate.getMonth();
const year = startDate.getFullYear();
const fullDate = day + " " + month + " " + year;
const currentDate = month1 + 1 + "/" + day + "/" + year;

exports.all = (req, res) => {
  // Returns all appointments
  Appointment.find({}).exec((err, appointments) => res.json(appointments));
};

exports.createAppoitnment = (req, res) => {
  var requestBody = req.body;

  var newappointment = new Appointment({
    drId: requestBody.drId,
    userId: requestBody.userId,
    name: requestBody.name,
    email: requestBody.email,
    phone: requestBody.phone,
    date: currentDate,
    aptoken: (Math.floor(Math.random() * 10000) + 10000)
      .toString()
      .substring(1),
    // slots: newslot._id,
  });
  const vonage = new Vonage({
    apiKey: process.env.apiKey,
    apiSecret: process.env.apiSecret,
  });
  ///////// message which will be send to user

  let msg = "";
  Doctor.findOne({ _id: requestBody.drId }).exec((error, data) => {
    if (error) {
      return res.status(400).json({ error });
    }

    if (data) {
      /// this message will be to user with doctor detaials
      msg = `${requestBody.name} This message is to confirm your appointment with Dr.${data.name},Consulting Timings:${data.timing}and your Token No.:${newappointment.aptoken}`;
      console.log(msg);
    }
  });

  // and saves the record to
  // the data base
  newappointment.save((err, saved) => {
    Appointment.find({ _id: saved._id }).exec((err, appointment) =>
      res.json(appointment)
    );
    const from = "VIRTUAL_NUMBER";
    const to = requestBody.phone;
    vonage.message.sendSms(from, to, msg, (err, responseData) => {
      if (err) {
        console.log(err);
      } else {
        console.dir(responseData);
      }
    });
  });
};

////////// dcotor can accesss and show his appoitnment ///////

exports.getDoctorAppoitnment = async (req, res) => {
  const doctorId = req.params.drId;
  try {
    const appoit = await Appointment.find({
      drid: doctorId,
      date: currentDate,
      // created_at: Date.now(), //crrent date ka appointment show karna chaiye
    });
    if (appoit) {
      console.log(fullDate);
      console.log(typeof currentDate);
      let totalAppoitnment = appoit.length;
      res.status(200).json({ totalAppoitnment, data: appoit });
    } else {
      res.status(401).json({ err: "Not Fount Appoitment list" });
    }
  } catch (err) {
    console.log(err);
  }
};
// exports.appointmentController = {
//   all: (req, res) => {
//     // Returns all appointments
//     Appointment.find({}).exec((err, appointments) => res.json(appointments));
//   },
//   create: (req, res) => {
//     var requestBody = req.body;
//     var newslot = new Slot({
//       slot_time: requestBody.slot_time,
//       slot_date: requestBody.slot_date,
//       created_at: Date.now(),
//     });
//     newslot.save();
//     // Creates a new record from a submitted form
//     var newappointment = new Appointment({
//       name: requestBody.name,
//       email: requestBody.email,
//       phone: requestBody.phone,
//       slots: newslot._id,
//     });
//     const vonage = new Vonage({
//       apiKey: proces.env.apiKey,
//       apiSecret: proces.env.apiSecret,
//     });
//     let msg =
//       requestBody.name +
//       " " +
//       "this message is to confirm your appointment at" +
//       " " +
//       requestBody.appointment;
//     // and saves the record to
//     // the data base
//     newappointment.save((err, saved) => {
//       // Returns the saved appointment
//       // after a successful save
//       Appointment.find({ _id: saved._id })
//         .populate("slots")
//         .exec((err, appointment) => res.json(appointment));
//       const from = "VIRTUAL_NUMBER";
//       const to = requestBody.phone;
//       vonage.message.sendSms(from, to, msg, (err, responseData) => {
//         if (err) {
//           console.log(err);
//         } else {
//           console.dir(responseData);
//         }
//       });
//     });
//   },
// };
