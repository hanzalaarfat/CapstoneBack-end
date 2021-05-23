const mongoose = require("mongoose");

const DonateSchema = new mongoose.Schema(
  {
    orgName: {
      type: String,
      trim: true,
      required: true,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    phone: {
      type: Number,
    },
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
    updates: [
      {
        type: String,
        trim: true,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("DonateOrg", DonateSchema);
