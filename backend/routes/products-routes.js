const express = require("express");
const {
  createProduct,
  getProducts,
  getProductById,
  deleteProductById,
  updateProductById
} = require("../controllers/products-controller");

const router = express.Router();

// GET /products
router.get("/", getProducts);

// GET /products/:pid
router.get("/:pid", getProductById);

// POST /products
router.post("/", createProduct);

// DELETE /products/:pid
router.delete("/:pid", deleteProductById);

// PATCH /products/:pid
router.patch("/:pid", updateProductById);

module.exports = router;
