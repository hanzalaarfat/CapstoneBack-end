const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    available: {
      type: Boolean,
      default: false,
      // required: true,
    },
    timing: {
      type: String,
    },
    days: [
      {
        type: String,
      },
    ],
    phone: {
      type: Number,
      // required: true,
    },
    specialist: {
      type: String,
      // required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    hash_password: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      // required: true,
    },
    city: {
      type: String,
      // required: true,
    },
    address: {
      type: String,
      // required: true,
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
    category: {
      // type: mongoose.Schema.Types.ObjectId,
      // ref: "Drcategory",
      type: String,
      trim: true,
      // required: true,
    },
  },

  { timestamps: true }
);

doctorSchema.virtual("password").set(function (password) {
  this.hash_password = bcrypt.hashSync(password, 10);
});

doctorSchema.virtual("fullName").get(function () {
  /// full name ko call kiy h login route me
  return `${this.firstName} ${this.lastName}`;
});

doctorSchema.methods = {
  authenticate: function (password) {
    //login time call hoga ye method whan se password pass hoga
    return bcrypt.compareSync(password, this.hash_password);
  },
};

module.exports = mongoose.model("Doctor", doctorSchema);

// doctorSchema.pre("save", async function (next) {
//   if (this.isModified("password")) {
//     console.log("point here");
//     this.password = await bcrypt.hash(this.password, 12);
//     this.cpassword = await bcrypt.hash(this.cpassword, 12);
//   }
//   next();
// });

// doctorSchema.methods.generateAuthToken = async function () {
//   try {
//     let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
//     this.tokens = this.tokens.concat({ token: token });
//     await this.save();
//     return token;
//   } catch (err) {
//     console.log(err);
//   }
// };
// const Doctor = mongoose.model("Doctor", doctorSchema);
// module.exports = Doctor;
