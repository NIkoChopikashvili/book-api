class UserAlreadyExist extends Error {
  constructor(message, statusCode = 403) {
    super(message);
    this.name = "UserAlreadyExist";
    this.statusCode = statusCode;
  }
}

module.exports = UserAlreadyExist;
