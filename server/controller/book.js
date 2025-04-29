const Book = require("../model/book");
const {uploadToCloudinary} = require("../Helpers");

const handleUploadBookThumbnail = async (req, res) => {
  try {
    const file = req?.file;
    const b64 = Buffer.from(file?.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await uploadToCloudinary(url);
    if (result) {
      return res.json({
        success: true,
        result,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Error occured",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

// Get all books
const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json({
      data: books,
      message: "Successfully retrieved books",
      success: true,
      count: books.length,
    });
  } catch (err) {
    res.status(500).json({ message: "Error retrieving books", success: false, error: err.message });
  }
};

// Add a new book
const addBook = async (req, res) => {
  try {
    const { title, author, coverUrl, pdfUrl } = req.body;

    // Basic validation
    if (!title || !author || !coverUrl || !pdfUrl) {
      return res.status(400).json({ message: "Please provide title, author, cover URL, and PDF URL", success: false });
    }

    const book = new Book({
      title,
      author,
      coverUrl,
      pdfUrl,
    });
    await book.save();

    if (!book) {
      return res.status(400).json({ message: "Error adding book", success: false });
    }

    res.status(201).json({
      data: book,
      message: "Successfully added book",
      success: true,
    });
  } catch (err) {
    res.status(500).json({ message: "Error adding book", success: false, error: err.message });
  }
};

// Get a single book by ID
const getBookById = async (req, res) => {
  try {
    const {  bookId } = req.params;
    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({ message: `No book with id ${bookId}`, success: false });
    }

    res.status(200).json({
        data: book,
        message: "Successfully retrieved book",
        success: true
    });
  } catch (err) {
    // Handle potential CastError if ID format is invalid
    if (err.name === 'CastError') {
        return res.status(400).json({ message: `Invalid book ID format: ${req.params.id}`, success: false });
    }
    res.status(500).json({ message: "Error retrieving book", success: false, error: err.message });
  }
};


// Update a book
const updateBook = async (req, res) => {
  try {
    const { id: bookId } = req.params;
    const { title, author, coverUrl, pdfUrl } = req.body;

    // Find the book first
    let book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({ message: `Book not found with id ${bookId}`, success: false });
    }

    // Update fields if provided in the request body
    book.title = title || book.title;
    book.author = author || book.author;
    book.coverUrl = coverUrl || book.coverUrl;
    book.pdfUrl = pdfUrl || book.pdfUrl;

    // Save the updated book
    const updatedBook = await book.save();

    if (!updatedBook) {
      return res.status(400).json({ message: "Error updating book", success: false });
    }

    res.status(200).json({
      data: updatedBook,
      message: "Successfully updated book",
      success: true,
    });
  } catch (err) {
     // Handle potential CastError if ID format is invalid
    if (err.name === 'CastError') {
        return res.status(400).json({ message: `Invalid book ID format: ${req.params.id}`, success: false });
    }
    res.status(500).json({ message: "Error updating book", success: false, error: err.message });
  }
};

// Delete a book
const deleteBook = async (req, res) => {
  try {
    const { id: bookId } = req.params;

    const book = await Book.findByIdAndDelete(bookId);

    if (!book) {
      return res.status(404).json({ message: `Book not found with id ${bookId}`, success: false });
    }

    res.status(200).json({
      message: "Successfully deleted book",
      success: true,
      data: book, // Optionally return the deleted book data
    });
  } catch (err) {
     // Handle potential CastError if ID format is invalid
    if (err.name === 'CastError') {
        return res.status(400).json({ message: `Invalid book ID format: ${req.params.id}`, success: false });
    }
    res.status(500).json({ message: "Error deleting book", success: false, error: err.message });
  }
};

module.exports = {
  getAllBooks,
  addBook,
  getBookById,
  updateBook,
  deleteBook,
  handleUploadBookThumbnail
};