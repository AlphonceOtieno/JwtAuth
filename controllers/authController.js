const authService = require("../services/authService");

// REGISTER USER
const registerUser = async (req, res) => {
  try {
    const result = await authService.registerUser(req.body);

    res.status(201).json({
      message: "User registered successfully",
      ...result,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// LOGIN USER
const loginUser = async (req, res) => {
  try {
    const result = await authService.loginUser(req.body);

    res.status(200).json({
      message: "Login successful",
      ...result,
    });
  } catch (error) {
    res.status(401).json({
      message: error.message,
    });
  }
};

// REFRESH TOKEN
const refreshToken = async (req, res) => {
  try {
    const { token } = req.body;
    const result = await authService.refreshToken(token);

    res.status(200).json({
      message: "Token refreshed",
      ...result,
    });
  } catch (error) {
    res.status(401).json({
      message: error.message,
    });
  }
};

// LOGOUT USER
const logoutUser = async (req, res) => {
  try {
    const { token } = req.body;
    await authService.logoutUser(token);

    res.status(200).json({
      message: "Logout successful",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// GET PROFILE
const getProfile = async (req, res) => {
  try {
    const user = await authService.getUserById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await authService.getAllUsers();
    res.status(200).json({
      users,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  refreshToken,
  logoutUser,
  getProfile,
  getAllUsers,
};
