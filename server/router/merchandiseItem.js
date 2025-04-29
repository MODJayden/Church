const express = require("express");
const {
  getAllMerchandiseItems,
  addMerchandiseItem,
  updateMerchandiseItem,
  deleteMerchandiseItem,
} = require("../controller/merchandiseItem"); // Import merchandiseItem controller functions

const router = express.Router();

// Define merchandiseItem routes
router.get("/get/merchandiseItems", getAllMerchandiseItems); // Get all merchandise items
router.post("/create/merchandiseItem", addMerchandiseItem); // Add a new merchandise item
router.put("/update/merchandiseItems/:id", updateMerchandiseItem); // Update a merchandise item by ID
router.delete("/delete/merchandiseItems/:id", deleteMerchandiseItem); // Delete a merchandise item by ID

module.exports = router;