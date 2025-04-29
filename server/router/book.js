const express = require("express");
const router = express.Router();

const {
  addBook,
  getAllBooks,
  getBookById,
  updateBook,
  handleUploadBookThumbnail,
  deleteBook,
} = require("../controller/book");
const { upload } = require("../Helpers");

router.post(
  "/upload-thumbnail",
  upload.single("thumbnail"),
  handleUploadBookThumbnail
);
router.get("/all/books", getAllBooks);
router.post("/create", addBook);
router.get("/get/:id", getBookById);
router.put("/update/:id", updateBook);
router.delete("/delete/:id", deleteBook);

module.exports = router;
