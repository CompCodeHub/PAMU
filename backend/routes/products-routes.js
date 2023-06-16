const express = require("express");
const {
  createProduct,
  getProducts,
  getProductById,
  deleteProductById,
  updateProductById
} = require("../controllers/products-controller");
const { userAuth, adminAuth } = require("../middleware/authMiddleware");

const router = express.Router();

// GET /products and POST /products
router.route("/").get(getProducts).post(userAuth, adminAuth, createProduct);

// GET /products/:pid and PATCH /products/:pid
router.route("/:pid").get(getProductById).put(userAuth, adminAuth, updateProductById);

// DELETE /products/:pid
router.delete("/:pid", deleteProductById);

module.exports = router;
