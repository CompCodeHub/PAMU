const express = require("express");
const { userAuth, adminAuth } = require("../middleware/authMiddleware");
const {
  uploadSingleImage,
  uploadImage,
  deleteImage
} = require("../controllers/uploads-controller");
const router = express.Router();

// POST /uploads/image
router.post("/image", userAuth, adminAuth, uploadSingleImage, uploadImage);

// DELETE /uploads/image/delete
router.delete("/image/:id", userAuth, adminAuth, deleteImage);

module.exports = router;
