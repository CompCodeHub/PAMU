const express = require("express");
const {
  loginUser,
  signupUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById,
} = require("../controllers/users-controllers");

const { userAuth, adminAuth } = require("../middleware/authMiddleware");

const router = express.Router();

// POST /users/login
router.post("/login", loginUser);

// POST /users/logout
router.post("/logout", logoutUser);

// GET /users (Admin protected) and POST /users
router.route("/").get(userAuth, adminAuth, getUsers).post(signupUser);

// GET /users/profile and PUT /users/profile (User protected)
router
  .route("/profile")
  .get(userAuth, getUserProfile)
  .put(userAuth, updateUserProfile);

// DELETE /users/:id, GET /users/:id, and PUT /users/:id (All Admin protected)
router
  .route("/:id")
  .delete(userAuth, adminAuth, deleteUserById)
  .get(userAuth, adminAuth, getUserById)
  .put(userAuth, adminAuth, updateUserById);

module.exports = router;
