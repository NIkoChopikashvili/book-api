const {
  createBookValidation,
  updateBookValidation,
  updatePageValidation,
  deleteBookValidation,
  bookDetailsValidation,
  readPageValidation,
  getBooksValidation,
} = require("./book.validation");
const {
  createUserValidation,
  userSignInValidation,
} = require("./user.validation");
module.exports = {
  createBookValidation,
  createUserValidation,
  userSignInValidation,
  updateBookValidation,
  updatePageValidation,
  deleteBookValidation,
  bookDetailsValidation,
  readPageValidation,
  getBooksValidation,
};
