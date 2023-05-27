const express = require("express");
const { loginUser, signupUser, getUserProfile } = require("../controllers/users-controllers");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// POST /users/login
router.post("/login", loginUser);

// POST /users/signup
router.post("/signup", signupUser);

// Use middleware for authentication
router.use(requireAuth);

// GET /users/profile
router.get("/profile", getUserProfile);

module.exports = router;
