const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const userAuth = async (req, res, next) => {
  // Check for jwt in cookie
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).json({ error: "Authorization token required!" });
  }

  try {
    // Get id from the token
    const { id } = jwt.verify(token, process.env.SECRET);
    // Attach user id for further requests
    req.user = await User.findOne({ _id: id }).select("-password");
    next();
  } catch (error) {
    res.status(401).json({ error: "Unauthorized request!" });
  }
};


// Admin check
const adminAuth  = (req, res, next) => {
  if(req.user && req.user.isAdmin){
    next();
  }else{
    res.status(401).json({ error: "Not authorized as admin!" });
  }
}

module.exports = {userAuth, adminAuth};
