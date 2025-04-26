const Gate = require("../model/gate");

const getAllGates = async (req, res) => {
  try {
    const gates = await Gate.find();
    res.status(200).json({
      data: gates,
      message: "Successfully retrieved gates",
      success: true,
    });
  } catch (err) {
    res.status(500).json({ message: "Error retrieving gates" });
  }
};

const addGate = async (req, res) => {
  try {
    const {
      name,
      description,
      meetingTime,
      location,
      gateLeader,
      gateMembers,
    } = req.body;

    const gate = new Gate({
      name,
      description,
      meetingTime,
      location,
      gateLeader,
      gateMembers,
    });
    await gate.save();

    if (!gate) {
      return res.status(400).json({ message: "Error adding gate" });
    }

    res.status(201).json({
      data: gate,
      message: "Successfully added gate",
      success: true,
    });
  } catch (err) {
    res.status(500).json({ message: "Error adding gate" });
  }
};

const updateGate = async (req, res) => {
  try {
    const { id } = req.params;
    const gate = await Gate.findById(id);

    if (!gate) {
      return res.status(404).json({ message: "Gate not found" });
    }

    const { data } = req.body;

    gate.name = data.name || gate.name;
    gate.description = data.description || gate.description;
    gate.meetingTime = data.meetingTime || gate.meetingTime;
    gate.location = data.location || gate.location;
    gate.gateLeader = data.gateLeader || gate.gateLeader;
    gate.gateMembers = data.gateMembers || gate.gateMembers;

    await gate.save();

    if (!gate) {
      return res.status(400).json({ message: "Error updating gate" });
    }

    res.status(200).json({
      data: gate,
      message: "Successfully updated gate",
      success: true,
    });
  } catch (err) {
    res.status(500).json({ message: "Error updating gate" });
  }
};

const deleteGate = async (req, res) => {
  try {
    const { id } = req.params;

    const gate = await Gate.findByIdAndDelete(id);
    if (!gate) {
      return res.status(404).json({ message: "Gate not found" });
    }
    res.status(200).json({
      message: "Successfully deleted gate",
      success: true,
      data: gate,
    });
  } catch (err) {
    res.status(500).json({ message: "Error deleting gate" });
  }
};

const addGateMember = async (req, res) => {
  try {
    const { id } = req.params;
    const { data } = req.body;
    const name = data;

    const gate = await Gate.findByIdAndUpdate(
      id,
      { $push: { gateMembers: name } }, // Push the string directly
      { new: true } // Return the updated document
    );

    if (!gate) {
      return res.status(404).json({ message: "Gate not found" });
    }

    res.status(200).json({
      data: gate.gateMembers,
      message: "Member added successfully",
      success: true,
    });
  } catch (err) {
    console.error("Add member error:", err);
    res.status(500).json({
      message: "Server error adding member",
      error: err.message,
    });
  }
};

const deleteGateMember = async (req, res) => {
  try {
    const { gateId, index } = req.params;
    const gate = await Gate.findById(gateId);

    if (!gate) {
      return res.status(404).json({ message: "Gate not found" });
    }

    // Remove member at specified index
    gate.gateMembers.splice(parseInt(index), 1);
    await gate.save();

    res.status(200).json({
      data: gate.gateMembers,
      message: "Member removed successfully",
      success: true,
    });
  } catch (err) {
    res.status(500).json({ message: "Error removing member" });
  }
};

module.exports = {
  getAllGates,
  addGate,
  updateGate,
  deleteGate,
  addGateMember,
  deleteGateMember,
};
