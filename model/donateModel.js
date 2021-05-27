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
    bank: {
      type: String,
      trim: true,
    },
    ac: {
      type: String,
      trim: true,
    },
    ifsc: {
      type: String,
      trim: true,
    },
    drequired: {
      type: Number,
      default: 0,
      trim: true,
    },
    draised: {
      type: Number,
      default: 0,
      trim: true,
    },
    emergency: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("DonateOrg", DonateSchema);
