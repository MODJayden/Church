const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gateSchema = new Schema({
  name: String,
  description: String,
  meetingTime: String,
  location: String,
  gateLeader: String,
  gateMembers: [String],
});

const Gate = mongoose.model("Gate", gateSchema);

module.exports = Gate;
