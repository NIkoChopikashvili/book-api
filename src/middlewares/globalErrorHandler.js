const { resultCodes } = require("../enums");

/**
 * @param {Error} error
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const globalErrorHandler = async (error, req, res, next) => {
  if (error) {
    let statusCode = 500;
    if (error?.statusCode) {
      statusCode = error.statusCode;
    }

    res.status(statusCode).json({
      result: resultCodes.ERROR,
      error: {
        name: error.name,
        message: error.message,
      },
    });

    console.log(error);
  } else {
    next();
  }
};

module.exports = globalErrorHandler;
