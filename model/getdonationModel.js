const mongoose = require("mongoose");
const Schema = mongoose.Schema,
  model = mongoose.model.bind(mongoose),
  ObjectId = mongoose.Schema.Types.ObjectId;

const getDonationSchema = new Schema(
  {
    orgId: ObjectId,
    userId: ObjectId,
    name: String,
    email: String,
    phone: Number,
    date: String,
    amount: Number,
    // slots: { type: ObjectId, ref: "Slot" },
    created_at: Date,
  },
  { timestamps: true }
);
const GetDonation = model("GetDonation", getDonationSchema);
module.exports = GetDonation;
