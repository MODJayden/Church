const mongoose = require("mongoose");

const serviceImageSchema = new mongoose.Schema({
  images: {
    type: [String],
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
},true,{timestamps:true});

const ServiceImage = mongoose.model("ServiceImage", serviceImageSchema);

module.exports = ServiceImage;