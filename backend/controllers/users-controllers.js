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
  res.status(200).json(users);
};

// Deletes a user
const deleteUserById = async (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      // Only delete if user is not admin
      if (user && !user.isAdmin) {
        User.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: "User deleted!" }))
          .catch((err) => res.status(404).json({ error: "User not found!" }));
      } else {
        res.status(401).json({ error: "Cannot delete admin user!" });
      }
    })
    .catch((err) => res.status(404).json({ error: "User not found!" }));
};

// Gets a user by his id
const getUserById = async (req, res) => {
  User.findById(req.params.id)
    .select("-password")
    .then((user) => res.status(200).json(user))
    .catch((err) => res.status(404).json({ error: "User not found!" }));
};

// Updates a user by his id
const updateUserById = async (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if(user){
        
      }
    })
    .catch((err) => res.status(404).json({ error: "User not found!" }));
};

module.exports = {
  signupUser,
  loginUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUserById,
  getUserById,
  updateUserById,
};
