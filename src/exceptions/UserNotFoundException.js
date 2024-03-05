class UserNotFound extends Error {
  constructor(message, statusCode = 404) {
    super(message);
    this.name = "UserNotFound";
    this.statusCode = statusCode;
  }
}

module.exports = UserNotFound;
