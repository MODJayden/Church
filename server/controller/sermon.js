const Sermon = require("../model/sermon");

// Get all sermons
const getAllSermons = async (req, res) => {
  try {
    const sermons = await Sermon.find();
    if (!sermons) {
      return res.status(404).json({ message: "No sermons found" });
    }
    res.status(200).json({
      data: sermons,
      message: "Successfully retrieved sermons",
      success: true,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error retrieving sermons", error: err.message });
  }
};

// Add a new sermon
const addSermon = async (req, res) => {
  try {
    const { title, date, pastor, audioUrl, duration } = req.body;

    // Basic validation
    if (!title || !date || !pastor || !audioUrl || !duration) {
      return res
        .status(400)
        .json({ message: "Missing required sermon fields" });
    }

    const myDate = date.split("T")[0];
    const sermon = new Sermon({
      title,
      date: myDate,
      pastor,
      audioUrl,
      duration,
    });
    await sermon.save();

    res.status(201).json({
      data: sermon,
      message: "Successfully added sermon",
      success: true,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error adding sermon", error: err.message });
  }
};

// Update an existing sermon
const updateSermon = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body; // Contains fields to update

    const sermon = await Sermon.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    }); // {new: true} returns the updated document

    if (!sermon) {
      return res.status(404).json({ message: "Sermon not found" });
    }

    res.status(200).json({
      data: sermon,
      message: "Successfully updated sermon",
      success: true,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating sermon", error: err.message });
  }
};

// Delete a sermon
const deleteSermon = async (req, res) => {
  try {
    const { id } = req.params;

    const sermon = await Sermon.findByIdAndDelete(id);

    if (!sermon) {
      return res.status(404).json({ message: "Sermon not found" });
    }

    res.status(200).json({
      message: "Successfully deleted sermon",
      success: true,
      data: sermon, // Optionally return the deleted sermon data
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting sermon", error: err.message });
  }
};

module.exports = {
  getAllSermons,
  addSermon,
  updateSermon,
  deleteSermon,
};
