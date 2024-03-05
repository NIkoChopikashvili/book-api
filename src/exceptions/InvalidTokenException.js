class InvalidToken extends Error {
  constructor(message, statusCode = 401) {
    super(message);
    this.name = "AccessTokenInvalid";
    this.statusCode = statusCode;
  }
}

module.exports = InvalidToken;
