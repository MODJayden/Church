const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const merchandiseItemSchema = new Schema(
  {
    name: String, // Name of the merchandise item
    price: String, // Price of the item
    imageUrl: String, // URL for the item's image
    sizes: [String], // Number of items in stock
    // Mongoose automatically adds an _id field.
  },
  { timestamps: true } // Adds createdAt and updatedAt timestamps
);

const MerchandiseItem = mongoose.model(
  "MerchandiseItem",
  merchandiseItemSchema
);

module.exports = MerchandiseItem;
