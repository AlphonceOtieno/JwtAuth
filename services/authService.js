const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const createAccessToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "15m" }
  );
};

const createRefreshToken = (user) => {
  const refreshSecret = process.env.REFRESH_TOKEN_SECRET || process.env.JWT_SECRET;
  return jwt.sign({ id: user._id }, refreshSecret, { expiresIn: "7d" });
};

// REGISTER USER
const registerUser = async (data) => {
  const { email, password, name } = data;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role: "user",
  });

  const accessToken = createAccessToken(user);
  const refreshToken = createRefreshToken(user);

  user.refreshToken = refreshToken;
  await user.save();

  return {
    accessToken,
    refreshToken,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};

// LOGIN USER
const loginUser = async (data) => {
  const { email, password } = data;

  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const accessToken = createAccessToken(user);
  const refreshToken = createRefreshToken(user);

  user.refreshToken = refreshToken;
  await user.save();

  return {
    accessToken,
    refreshToken,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};

const refreshToken = async (token) => {
  if (!token) {
    throw new Error("Refresh token required");
  }

  const refreshSecret = process.env.REFRESH_TOKEN_SECRET || process.env.JWT_SECRET;
  let payload;

  try {
    payload = jwt.verify(token, refreshSecret);
  } catch (error) {
    throw new Error("Invalid refresh token");
  }

  const user = await User.findById(payload.id);
  if (!user || user.refreshToken !== token) {
    throw new Error("Refresh token not valid");
  }

  const accessToken = createAccessToken(user);
  return {
    accessToken,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};

const logoutUser = async (token) => {
  if (!token) {
    throw new Error("Refresh token required");
  }

  const user = await User.findOne({ refreshToken: token });
  if (!user) {
    throw new Error("Invalid refresh token");
  }

  user.refreshToken = undefined;
  await user.save();
  return true;
};

const getUserById = async (id) => {
  return await User.findById(id).select("name email role");
};

const getAllUsers = async () => {
  return await User.find().select("name email role");
};

module.exports = {
  registerUser,
  loginUser,
  refreshToken,
  logoutUser,
  getUserById,
  getAllUsers,
};