const { createBookValidation } = require("./book.validation");
const {
  createUserValidation,
  userSignInValidation,
} = require("./user.validation");
module.exports = {
  createBookValidation,
  createUserValidation,
  userSignInValidation,
};
