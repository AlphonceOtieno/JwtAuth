const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
router.post("/refresh", authController.refreshToken);
router.post("/logout", authController.logoutUser);
router.get("/profile", authMiddleware, authController.getProfile);
router.get(
  "/users",
  authMiddleware,
  roleMiddleware("admin"),
  authController.getAllUsers
);

module.exports = router;
