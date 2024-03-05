const BookNotFound = require("./BookNotFoundException");
const InvalidToken = require("./InvalidTokenException");
const UserNotFound = require("./UserNotFoundException");
const UserAlreadyExist = require("./UserAlreadyExistException");
const IncorrectPassword = require("./IncorrectPasswordException");
const PageNotFound = require("./PageNotFoundException");

module.exports = {
  BookNotFound,
  UserAlreadyExist,
  InvalidToken,
  UserNotFound,
  IncorrectPassword,
  PageNotFound,
};
