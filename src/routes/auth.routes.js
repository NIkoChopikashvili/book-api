const express = require("express");
const { signUp, signIn } = require("../controllers/auth.controllers");
const { Validator } = require("../middlewares");
const {
  createUserValidation,
  userSignInValidation,
} = require("../validations");

const router = express.Router();

// POST
router.post("/signup", Validator(createUserValidation), signUp);
router.post("/signIn", Validator(userSignInValidation), signIn);

module.exports = router;
