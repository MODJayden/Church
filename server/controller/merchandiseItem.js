const MerchandiseItem = require("../model/merchandiseItem");

// Get all merchandise items
const getAllMerchandiseItems = async (req, res) => {
  try {
    const merchandiseItems = await MerchandiseItem.find();
    res.status(200).json({
      data: merchandiseItems,
      message: "Successfully retrieved merchandise items",
      success: true,
    });
  } catch (err) {
    res.status(500).json({ message: "Error retrieving merchandise items", error: err.message });
  }
};

// Add a new merchandise item
const addMerchandiseItem = async (req, res) => {
  try {
    const { name, price, imageUrl, sizes } = req.body;

    // Basic validation
    if (!name || !price || !imageUrl || !sizes) {
        return res.status(400).json({ message: "Missing required merchandise item fields" });
    }

    const merchandiseItem = new MerchandiseItem({
      name,
      price,
      imageUrl,
      sizes,
    });
    await merchandiseItem.save();

    res.status(201).json({
      data: merchandiseItem,
      message: "Successfully added merchandise item",
      success: true,
    });
  } catch (err) {
    res.status(500).json({ message: "Error adding merchandise item", error: err.message });
  }
};

// Update an existing merchandise item
const updateMerchandiseItem = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body; // Contains fields to update

    const merchandiseItem = await MerchandiseItem.findByIdAndUpdate(id, updateData, { new: true, runValidators: true }); // {new: true} returns the updated document

    if (!merchandiseItem) {
      return res.status(404).json({ message: "Merchandise item not found" });
    }

    res.status(200).json({
      data: merchandiseItem,
      message: "Successfully updated merchandise item",
      success: true,
    });
  } catch (err) {
    res.status(500).json({ message: "Error updating merchandise item", error: err.message });
  }
};

// Delete a merchandise item
const deleteMerchandiseItem = async (req, res) => {
  try {
    const { id } = req.params;

    const merchandiseItem = await MerchandiseItem.findByIdAndDelete(id);

    if (!merchandiseItem) {
      return res.status(404).json({ message: "Merchandise item not found" });
    }

    res.status(200).json({
      message: "Successfully deleted merchandise item",
      success: true,
      data: merchandiseItem, // Optionally return the deleted merchandise item data
    });
  } catch (err) {
    res.status(500).json({ message: "Error deleting merchandise item", error: err.message });
  }
};

module.exports = {
  getAllMerchandiseItems,
  addMerchandiseItem,
  updateMerchandiseItem,
  deleteMerchandiseItem,
};