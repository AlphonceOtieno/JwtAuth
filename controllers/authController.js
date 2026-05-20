const authService = require("../services/authService");

// REGISTER USER
const registerUser = async (req, res) => {
  try {
    const user = await authService.registerUser(req.body);

    res.status(201).json({
      message: "User registered successfully",
      user,
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

// GET PROFILE (placeholder for now)
const getProfile = async (req, res) => {
  try {
    res.status(200).json({
      message: "Profile route working (we will protect this later)",
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
  getProfile,
};
