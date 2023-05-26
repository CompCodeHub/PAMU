const jwt = require("jsonwebtoken");

// Generates and returns a jwt token
const generateToken = (id) => {
  // Token expires in 3 days
  return jwt.sign({ id }, process.env.SECRET, { expiresIn: "3d" });
};

module.exports = { generateToken };
