const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const validateRequest = require("../middleware/validateRequest");
const {
  registerValidation,
  loginValidation,
  tokenValidation,
  otpRequestValidation,
  otpVerifyValidation,
} = require("../validators/authValidator");

router.post(
  "/register",
  registerValidation,
  validateRequest,
  authController.registerUser
);
router.post("/login", loginValidation, validateRequest, authController.loginUser);
router.post(
  "/refresh",
  tokenValidation,
  validateRequest,
  authController.refreshToken
);
router.post(
  "/logout",
  tokenValidation,
  validateRequest,
  authController.logoutUser
);
router.post(
  "/otp/request",
  otpRequestValidation,
  validateRequest,
  authController.requestOtp
);
router.post(
  "/otp/verify",
  otpVerifyValidation,
  validateRequest,
  authController.verifyOtp
);
router.get("/profile", authMiddleware, authController.getProfile);
router.get(
  "/users",
  authMiddleware,
  roleMiddleware("admin"),
  authController.getAllUsers
);

module.exports = router;
