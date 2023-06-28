const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const fs = require("fs");
const cloudinary = require("../utils/cloudinaryConfig");

// Set The Storage Engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, `${uuidv4()}-${Date.now()}-${file.originalname}`);
  },
});

// Check File Type
const fileFilter = (req, file, cb) => {
  // Allowed ext
  const filetypes = /jpeg|jpg|png/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
};

const upload = multer({ storage, fileFilter });
const uploadSingleImage = upload.single("image");

// handles image upload
const uploadImage = async (req, res) => {
  // upload image to cloudinary
  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    res.send({
      id: result.public_id,
      message: "Image uploaded successfully",
      url: result.secure_url,
    });
    
    // delete image from local storage
    fs.unlinkSync(req.file.path);
  } catch (error) {
    res.send({
      message: "Error uploading image!",
    });
  }
};

// handles image delete
const deleteImage = async (req, res) => {
  // delete image from cloudinary
  try {
    const result = await cloudinary.uploader.destroy(req.params.id);
    res.send({
      message: "Image deleted successfully",
    });
  } catch (error) {
    res.send({
      message: "Error deleting image!",
    });
  }
};

module.exports = { uploadSingleImage, uploadImage, deleteImage };
