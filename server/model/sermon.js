const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sermonSchema = new Schema(
  {
    title: String,
    date: String, // Using the Date type for dates
    pastor: String,
    audioUrl: String,
    duration: String, // Using String for duration (e.g., "HH:MM:SS")
    // Mongoose automatically adds an _id field, so 'id' is omitted unless specifically needed differently.
  },
  { timestamps: true }
);

const Sermon = mongoose.model("Sermon", sermonSchema);

module.exports = Sermon;
