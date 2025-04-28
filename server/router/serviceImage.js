const express = require("express");
const router = express.Router();
const {
  handleUploadImage,
  createServiceImage,
  getServiceImage,
  getAllServiceImage,
} = require("../controller/seviceImage");
const { upload } = require("../Helpers");

router.post("/upload", upload.array("course", 15), handleUploadImage);

router.post("/create", createServiceImage);
router.get("/get/:id", getServiceImage);
router.get("/getAll", getAllServiceImage);

module.exports = router;
