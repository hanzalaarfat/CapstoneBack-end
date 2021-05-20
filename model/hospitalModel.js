const mongoose = require("mongoose");

const hospitalSchema = new mongoose.Schema(
  {
    hospitalName: {
      type: String,
      trim: true,
      required: true,
    },
    specialist: [
      {
        type: String,
        trim: true,
        required: true,
      },
    ],
    state: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      trim: true,
    },
    equipment: [
      {
        type: String,
        trim: true,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Hospital", hospitalSchema);
