const User = require("../models/userModel");
const { generateToken } = require("../utils/tokenGenerator");
const bcrypt = require("bcrypt");

// Logs in a user
const loginUser = async (req, res) => {
  // Get email,passsword from request body
  const { email, password } = req.body;

  try {
    //Try to login user
    const user = await User.login(email, password);

    // Create token and send cookie
    generateToken(res, user._id);

    res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

// Sign up a user
const signupUser = async (req, res) => {
  // Get name, email, password, isAdmin
  const { name, email, password } = req.body;

  try {
    //Try to signup user
    const user = await User.signup(name, email, password);

    // Create token and set cookie
    generateToken(res, user._id);

    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a user's profile
const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404).json({ error: "User not found!" });
  }
};

// Updates a user's profile
const updateUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    // Set only fields that request body has
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      // Generate bcrypt salt and hash
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(req.body.password, salt);

      // Store hash
      user.password = hash;
    }

    // Save and send user data
    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404).json({ error: "User not found!" });
  }
};

// Logs out a user
const logoutUser = (req, res) => {
  // Delete the cookie
  res.cookie("jwt", "", { httpOnly: true, expires: new Date(0) });
  res.status(200).json({ message: "Logged out successfully!" });
};

// Gets all users
const getUsers = async (req, res) => {
  const users = await User.find({});
  res.json(users);
};

// Deletes a user
const deleteUser = async (req, res) => {
  res.send("delete user");
};

// Gets a user by his id
const getUserById = async (req, res) => {
  res.send("get user by id");
};

// Updates a user by his id
const updateUserById = async (req, res) => {
  res.send("update user by id");
};

module.exports = {
  signupUser,
  loginUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUserById,
};
