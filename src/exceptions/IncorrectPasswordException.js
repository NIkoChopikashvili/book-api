class IncorrectPassword extends Error {
  constructor(message, statusCode = 401) {
    super(message);
    this.name = "IncorrectPassword";
    this.statusCode = statusCode;
  }
}

module.exports = IncorrectPassword;
