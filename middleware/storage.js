const multer = require("multer");
const shortid = require("shortid");
const path = require("path");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");
const dotenv = require("dotenv");
dotenv.config();

const mongoose = require("mongoose");
// router.post("/signin", (req, res) => {});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + "-" + file.originalname);
  },
});

const accessKeyId = process.env.accessKeyId;
const secretAccessKey = process.env.secretAccessKey;

console.log(accessKeyId);

const s3 = new aws.S3({
  accessKeyId,
  secretAccessKey,
});

exports.upload = multer({ storage });

//   exports.uploadS3 = multer({
exports.uploadS3 = multer({
  storage: multerS3({
    s3: s3,
    bucket: "capstone-doctor",
    acl: "public-read",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, shortid.generate() + "-" + file.originalname);
    },
  }),
});
