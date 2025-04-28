const { uploadToCloudinary } = require("../Helpers");
const ServiceImage = require("../model/serviceImage");

const handleUploadImage = async (req, res) => {
  try {
    const files = req.files;
    const results = await Promise.all(
      files.map(async (file) => {
        const b64 = Buffer.from(file.buffer).toString("base64");
        const url = `data:${file.mimetype};base64,${b64}`;
        return await uploadToCloudinary(url);
      })
    );
    res.json({ success: true, results });
  } catch (error) {
    res.json({ success: false, message: "Error occured" });
  }
};

const createServiceImage = async (req, res) => {
  const { images, date, title } = req.body;

  try {
    if (!images || !date || !title) {
      return res.json({
        success: false,
        message: "Please fill all the fields",
      });
    }
    const seviceImage = await ServiceImage.create({
      images,
      date,
      title,
    });
    res.json({
      success: true,
      message: "Sevice Image created successfully",
      data:seviceImage,
    });
  } catch (error) {
    res.json({ success: false, message: "Sevice Image not created" });
  }
};

const getServiceImage = async (req, res) => {
  try {
    const { id } = req.params;
    const serviceImage = await ServiceImage.findById(id);
    if (!serviceImage) {
      return res.json({ success: false, message: "Sevice Image not found" });
    }
    res.json({ success: true, data: serviceImage });
  } catch (error) {
    res.json({ success: false, message: "Sevice Image not found" });
  }
};
  const getAllServiceImage = async (req, res) => {
    try {
      const serviceImage = await ServiceImage.find();
      if (!serviceImage) {
        return res.json({ success: false, message: "Sevice Image not found" });
      }
      res.json({ success: true, data: serviceImage });
    } catch (error) {
      res.json({ success: false, message: "Sevice Image not found" });
    }
  };

module.exports = {
  handleUploadImage,
  createServiceImage,
  getServiceImage,
  getAllServiceImage,
};
