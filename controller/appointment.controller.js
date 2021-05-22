// const { Appointment, Slot } = Model;
const Appointment = require("../model/appointment.model");
const Slot = require("../model/slot.model");
console.log(Appointment);
const dotenv = require("dotenv");
dotenv.config();
const Vonage = require("@vonage/server-sdk"); // for send messaging
const fast2sms = require("fast-two-sms");

(exports.all = (req, res) => {
  // Returns all appointments
  Appointment.find({}).exec((err, appointments) => res.json(appointments));
}),
  (exports.createAppoitnment = (req, res) => {
    var requestBody = req.body;

    var newslot = new Slot({
      slot_time: requestBody.slot_time,
      slot_date: requestBody.slot_date,
      created_at: Date.now(),
    });
    newslot.save();
    // Creates a new record from a submitted form
    var newappointment = new Appointment({
      name: requestBody.name,
      email: requestBody.email,
      phone: requestBody.phone,
      slots: newslot._id,
    });
    // const vonage = new Vonage({
    //   apiKey: process.env.apiKey,
    //   apiSecret: process.env.apiSecret,
    // });
    // let msg =
    //   requestBody.name +
    //   " " +
    //   "this message is to confirm your appointment at" +
    //   " " +
    //   requestBody.appointment;
    // and saves the record to
    // the data base
    newappointment.save((err, saved) => {
      // Returns the saved appointment
      // after a successful save
      Appointment.find({ _id: saved._id })
        .populate("slots")
        .exec((err, appointment) => res.json(appointment));
      // const from = "VIRTUAL_NUMBER";
      // const to = requestBody.phone;
      //  vonage.message.sendSms(from, to, msg, (err, responseData) => {
      //   if (err) {
      //     console.log(err);
      //   } else {
      //     console.dir(responseData);
      //   }
      // });
      var options = {
        authorization: process.env.YOUR_API_KEY,
        message: "YOUR_Appoitntment Successfull",
        numbers: [requestBody.phone],
      };

      async function smsSend(options) {
        const response = await fast2sms.sendMessage(options);
        console.log(response);
      }
    });
  });

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
