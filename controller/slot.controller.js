const Slot = require("../model/slot.model");
exports.all = (req, res) => {
  // Returns all Slots
  Slot.find({}).exec((err, slots) => res.json(slots));
};
