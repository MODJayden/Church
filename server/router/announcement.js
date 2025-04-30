const express = require("express");
const {
  getAllAnnouncements, // Changed import
  addAnnouncement,     // Changed import
  updateAnnouncement,  // Changed import
  deleteAnnouncement,  // Changed import
} = require("../controller/announcement"); // Import announcement controller functions

const router = express.Router();

// Define announcement routes
router.get("/get/announcements", getAllAnnouncements); // Get all announcements - Changed path and function
router.post("/create/announcement", addAnnouncement); // Add a new announcement - Changed path and function
router.put("/update/announcements/:id", updateAnnouncement); // Update an announcement by ID - Changed path and function
router.delete("/delete/announcements/:id", deleteAnnouncement); // Delete an announcement by ID - Changed path and function

module.exports = router;