const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authService = require("../services/authService");
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
  async (req, res) => {
    try {
      const result = await authService.requestOtp(req.body);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);
router.post(
  "/otp/verify",
  otpVerifyValidation,
  validateRequest,
  async (req, res) => {
    try {
      const result = await authService.verifyOtp(req.body);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);
router.get("/profile", authMiddleware, authController.getProfile);
router.get(
  "/users",
  authMiddleware,
  roleMiddleware("admin"),
  authController.getAllUsers
);

module.exports = router;
