const User = require("../models/userModel");
const { generateToken } = require("../utils/tokenGenerator");

// Logs in a user
const loginUser = async (req, res) => {
  // Get email,passsword from request body
  const { email, password } = req.body;

  // try to find user with that email
  const user = await User.findOne({ email });
};

// Sign up a user
const signupUser = async (req, res) => {
  // Get name, email, password, isAdmin
  const { name, email, password } = req.body;

  try {
    //Try to signup user
    const user = await User.signup(name, email, password);

    // Create token
    const token = generateToken(user._id);

    res
      .status(200)
      .json({ id: user._id, name: user.name, email: user.email, token: token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { signupUser, loginUser };
