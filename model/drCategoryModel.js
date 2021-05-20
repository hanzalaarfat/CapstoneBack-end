const mongoose = require("mongoose");

const doctorCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    type: {
      type: String,
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("Drcategory", doctorCategorySchema);
