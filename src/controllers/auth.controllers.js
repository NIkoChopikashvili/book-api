const { hashPassword, comparePassword } = require("../utils/hashing");
const { generateJwt } = require("../utils/jwt");
const { UserModel } = require("../models");
const {
  UserAlreadyExist,
  UserNotFound,
  IncorrectPassword,
} = require("../exceptions");
const { resultCodes } = require("../enums");

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
exports.signUp = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const userExists = await UserModel.findOne({ where: { username } });

    if (userExists)
      throw new UserAlreadyExist("User with that username already exists.");

    const hashedPwd = await hashPassword(password);

    const user = await UserModel.create({
      username,
      password: hashedPwd,
    });

    const token = generateJwt(user, process.env.JWT_SECRET_KEY, res);

    return res.status(201).json({
      result: resultCodes.SUCCESS,
      message: "The token has been set to cookies.",
      token,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
exports.signIn = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await UserModel.findOne({ where: { username } });

    if (!user)
      throw new UserNotFound("User with that username does not exist.");

    const isCorrect = await comparePassword(password, user.password);

    if (!isCorrect)
      throw new IncorrectPassword("Provided password is incorrect.");

    const token = generateJwt(user, process.env.JWT_SECRET_KEY, res);

    return res.status(200).json({
      result: resultCodes.SUCCESS,
      message: "The token has been set to cookies.",
      token,
    });
  } catch (err) {
    next(err);
  }
};
