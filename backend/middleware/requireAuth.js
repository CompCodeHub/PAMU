const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const requireAuth = async (req, res, next) => {
  // Check for jwt in headers
  const { authorization } = req.headers;
  
  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required!" });
  }

  // Get token if it exists
  const token = authorization.split(" ")[1];

  try {
    // Get the id from  the signed token
    const { id } = jwt.verify(token, process.env.SECRET);

    // Attach user id for further requests
    req.user = await User.findOne({ _id: id }).select("-password");

    //Move on
    next();
  } catch (error) {
    res.status(401).json({ error: "Unauthorized request!" });
  }
};

module.exports = requireAuth;
