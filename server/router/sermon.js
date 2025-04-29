const express = require("express");
const {
  getAllSermons,
  addSermon,
  updateSermon,
  deleteSermon,
} = require("../controller/sermon"); // Import sermon controller functions

const router = express.Router();

// Define sermon routes
router.get("/get/sermons", getAllSermons); // Get all sermons
router.post("/create/sermon", addSermon); // Add a new sermon
router.put("/update/sermons/:id", updateSermon); // Update a sermon by ID
router.delete("/delete/sermons/:id", deleteSermon); // Delete a sermon by ID

module.exports = router;