const mongoose = require("mongoose");

const issueSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    drId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
    },
    user: {
      type: String,
      default: "user",
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    issue: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Issue", issueSchema);
