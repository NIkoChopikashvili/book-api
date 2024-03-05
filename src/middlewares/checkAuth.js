const { InvalidToken } = require("../exceptions");
const jwt = require("jsonwebtoken");

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
module.exports.authHandler = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) throw new InvalidToken("Access token is invalid.");

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) throw new InvalidToken("Access token is invalid.");

    req.user = user;
    next();
  });
};
