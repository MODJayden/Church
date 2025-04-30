const Announcement = require("../model/announcement"); // Changed import

// Get all announcements
const getAllAnnouncements = async (req, res) => { // Renamed function
  try {
    const announcements = await Announcement.find().sort({ createdAt: -1 }); // Changed model
    if (!announcements || announcements.length === 0) { // Added check for empty array
      return res.status(404).json({ message: "No announcements found" }); // Changed message
    }
    res.status(200).json({
      data: announcements,
      message: "Successfully retrieved announcements", // Changed message
      success: true,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error retrieving announcements", error: err.message }); // Changed message
  }
};

// Add a new announcement
const addAnnouncement = async (req, res) => { // Renamed function
  try {
    const { title, content, date, author, category } = req.body; // Updated fields

    // Basic validation
    if (!title || !content || !date || !author || !category) { // Updated validation
      return res
        .status(400)
        .json({ message: "Missing required announcement fields" }); // Changed message
    }

    // Optional: Format date if needed, similar to sermon controller
    // const myDate = date.split("T")[0]; // Uncomment and adjust if date format needs processing

    const announcement = new Announcement({ // Changed model
      title,
      content,
      date, // Use formatted date if applicable: date: myDate,
      author,
      category,
    });
    await announcement.save();

    res.status(201).json({
      data: announcement,
      message: "Successfully added announcement", // Changed message
      success: true,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error adding announcement", error: err.message }); // Changed message
  }
};

// Update an existing announcement
const updateAnnouncement = async (req, res) => { // Renamed function
  try {
    const { id } = req.params;
    const updateData = req.body; // Contains fields to update

    const announcement = await Announcement.findByIdAndUpdate(id, updateData, { // Changed model
      new: true,
      runValidators: true,
    });

    if (!announcement) {
      return res.status(404).json({ message: "Announcement not found" }); // Changed message
    }

    res.status(200).json({
      data: announcement,
      message: "Successfully updated announcement", // Changed message
      success: true,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating announcement", error: err.message }); // Changed message
  }
};

// Delete an announcement
const deleteAnnouncement = async (req, res) => { // Renamed function
  try {
    const { id } = req.params;

    const announcement = await Announcement.findByIdAndDelete(id); // Changed model

    if (!announcement) {
      return res.status(404).json({ message: "Announcement not found" }); // Changed message
    }

    res.status(200).json({
      message: "Successfully deleted announcement", // Changed message
      success: true,
      data: announcement, // Optionally return the deleted announcement data
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting announcement", error: err.message }); // Changed message
  }
};

module.exports = {
  getAllAnnouncements,
  addAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
}; // Updated exports