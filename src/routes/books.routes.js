const express = require("express");
const {
  createBook,
  bookDetails,
  deleteBook,
  books,
  updateBook,
  updatePage,
} = require("../controllers/books.controllers");
const { authHandler, Validator } = require("../middlewares");
const { createBookValidation } = require("../validations");

const router = express.Router();

// POST
// CHECK - AUTH
router.post("/book", Validator(createBookValidation), authHandler, createBook);

// GET
router.get("/book/:id", bookDetails);
router.get("/books", books);

// DELETE
router.delete("/book/:id", deleteBook);

// PUT
router.put("/book/:id", authHandler, updateBook);
router.put("/page/:id", authHandler, updatePage);

module.exports = router;
