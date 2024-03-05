class PageNotFound extends Error {
  constructor(message, statusCode = 404) {
    super(message);
    this.name = "PageNotFound";
    this.statusCode = statusCode;
  }
}

module.exports = PageNotFound;
