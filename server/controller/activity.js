const Activity = require("../model/activities");

const createActivity = async (req, res) => {
  try {
    const { title, description, date, time, location, category } = req.body;
    if (!title || !description || !date || !time || !location || !category) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const myDate = date.split("T")[0];

    const activity = new Activity({
      title,
      description,
      date: myDate,
      time,
      location,
      category,
    });
    await activity.save();

    res.status(201).json({
      message: "Activity created successfully",
      data: activity,
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating activity" });
  }
};

const getAllActivities = async (req, res) => {
  try {
    const activities = await Activity.find().sort({ createdAt: -1 });
    res.status(200).json({
      message: "Activities retrieved successfully",
      data: activities,
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving activities" });
  }
};

const getActivityById = async (req, res) => {
  try {
    const { id } = req.params;
    const activity = await Activity.findById(id);
    if (!activity) {
      return res.status(404).json({ message: "Activity not found" });
    }
    res.status(200).json({
      message: "Activity retrieved successfully",
      data: activity,
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving activity" });
  }
};

const updateActivity = async (req, res) => {
  try {
    const { id } = req.params;
    const { data } = req.body;
    const { title, description, date, time, location, category } = data;

    if (!title || !description || !date || !time || !location) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const myDate = date.split("T")[0];

    const activity = await Activity.findByIdAndUpdate(id, {
      title,
      description,
      date: myDate,
      time,
      location,
      category,
    });
    if (!activity) {
      return res.status(404).json({ message: "Activity not found" });
    }
    res.status(200).json({
      message: "Activity updated successfully",
      data: activity,
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating activity" });
  }
};

const deleteActivity = async (req, res) => {
  try {
    const { id } = req.params;
    const activity = await Activity.findByIdAndDelete(id);
    if (!activity) {
      return res.status(404).json({ message: "Activity not found" });
    }
    res.status(200).json({
      message: "Activity deleted successfully",
      data: activity,
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: "Error deleting activity" });
  }
};

module.exports = {
  createActivity,
  getAllActivities,
  getActivityById,
  updateActivity,
  deleteActivity,
};
