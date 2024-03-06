const express = require("express");
const {
  createBook,
  bookDetails,
  deleteBook,
  books,
  updateBook,
  updatePage,
  readBook,
} = require("../controllers/books.controllers");
const { authHandler, Validator } = require("../middlewares");
const {
  createBookValidation,
  updateBookValidation,
  updatePageValidation,
  deleteBookValidation,
  bookDetailsValidation,
  readPageValidation,
  getBooksValidation,
} = require("../validations");

const router = express.Router();

// POST
router.post("/book", Validator(createBookValidation), authHandler, createBook);

// GET
router.get("/book/:id", Validator(bookDetailsValidation), bookDetails);
router.get(
  "/page/:bookId",
  Validator(readPageValidation),
  authHandler,
  readBook
);
router.get("/books", Validator(getBooksValidation), books);

// DELETE
router.delete(
  "/book/:id",
  Validator(deleteBookValidation),
  authHandler,
  deleteBook
);

// PUT
router.put(
  "/book/:id",
  Validator(updateBookValidation),
  authHandler,
  updateBook
);
router.put(
  "/page/:id",
  Validator(updatePageValidation),
  authHandler,
  updatePage
);

module.exports = router;
