const express = require("express");
const { loginUser, signupUser } = require("../controllers/users-controllers");

const router = express.Router();

// POST /users/login
router.post("/login", loginUser);

// POST /users/signup
router.post("/signup", signupUser);

module.exports = router;
