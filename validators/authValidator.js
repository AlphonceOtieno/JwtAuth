const { body } = require("express-validator");

const registerValidation = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("email")
    .trim()
    .isEmail()
    .withMessage("Valid email is required")
    .normalizeEmail(),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),
];

const loginValidation = [
  body("email")
    .trim()
    .isEmail()
    .withMessage("Valid email is required")
    .normalizeEmail(),
  body("password").notEmpty().withMessage("Password is required"),
];

const tokenValidation = [
  body("token").notEmpty().withMessage("Refresh token is required"),
];

const otpRequestValidation = [
  body("email")
    .trim()
    .isEmail()
    .withMessage("Valid email is required")
    .normalizeEmail(),
];

const otpVerifyValidation = [
  body("email")
    .trim()
    .isEmail()
    .withMessage("Valid email is required")
    .normalizeEmail(),
  body("code")
    .trim()
    .isLength({ min: 6, max: 6 })
    .withMessage("OTP code must be 6 digits"),
];

module.exports = {
  registerValidation,
  loginValidation,
  tokenValidation,
  otpRequestValidation,
  otpVerifyValidation,
};
