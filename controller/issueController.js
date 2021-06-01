const Issue = require("../model/issuModel");

const Doctor = require("../model/aut.model");

const dotenv = require("dotenv");
dotenv.config();

var today = new Date();
var dd = String(today.getDate()).padStart(2, "0");
var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
var yyyy = today.getFullYear();
today = mm + "/" + dd + "/" + yyyy;

exports.postIssue = (req, res) => {
  const { name, email, issue } = req.body;
  console.log(name, email, issue);
  const drId = req.body.drId;
  const userId = req.body.userId;
  try {
    if (drId) {
      const issueObj = new Issue({
        name,
        email,
        issue,
        drId,
        user: "doctor",
        date: today,
      });
      issueObj.save((err, data) => {
        if (err) {
          return res.status(400).json({ meesage: "Something Wrong" });
        }
        if (data) {
          return res.status(200).json({ message: "message successfully send" });
        }
      });
    }
    if (userId) {
      const issueObj = new Issue({
        name,
        email,
        issue,
        userId,
        date: today,
      });
      issueObj.save((err, data) => {
        if (err) {
          return res.status(400).json({ meesage: "Something Wrong" });
        }
        if (data) {
          return res.status(200).json({ message: "message successfully send" });
        }
      });
    }
  } catch (err) {
    return res.status(400).json({ message: err });
  }
};

exports.getAllIssue = async (req, res) => {
  const data = await Issue.find({});
  if (data.length > 0) {
    return res.status(200).json({ data: data });
  } else {
    return res.status(400).json({ message: "No issue Found" });
  }
};
