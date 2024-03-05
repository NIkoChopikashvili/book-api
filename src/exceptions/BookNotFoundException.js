class BookNotFound extends Error {
  constructor(message, statusCode = 404) {
    super(message);
    this.name = "BookNotFound";
    this.statusCode = statusCode;
  }
}

module.exports = BookNotFound;
