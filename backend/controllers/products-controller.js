const mongoose = require("mongoose");
const Product = require("../models/productModel");

// Gets all products
const getProducts = (req, res) => {
  //Find all products
  Product.find({})
    .then((products) => {
      res.status(200).json(products);
    })
    .catch((err) => {
      res.status(404).json({ message: "No products found!" });
    });
};

// Gets a product by id
const getProductById = (req, res) => {
  // Get id from params
  const { pid } = req.params;

  // Validate if its a valid mongoose object id
  if (!mongoose.Types.ObjectId.isValid(pid)) {
    return res.status(404).json({ message: "Invalid product id" });
  }

  // Get the proudct by id
  Product.findById(pid)
    .then((product) => {
      res.status(200).json(product);
    })
    .catch(() => {
      res.status(404).json({ message: "Product not found!" });
    });
};

// Creates a product
const createProduct = (req, res) => {
  // Extract data from request body
  const {
    name,
    image,
    brand,
    category,
    description,
    price,
    quantity,
  } = req.body;

  // Create the product
  Product.create({
    creator: req.user._id,
    name,
    image,
    brand,
    category,
    description,
    price,
    quantity,
  })
    .then((product) => {
      res.status(201).json(product);
    })
    .catch((err) => res.status(400).json({ error: err.message }));
};

// Deletes a product
const deleteProductById = (req, res) => {
  // Get the product id from params
  const { pid } = req.params;

  // Validate if its a valid mongoose object id
  if (!mongoose.Types.ObjectId.isValid(pid)) {
    return res.status(404).json({ message: "Invalid product id" });
  }

  // Delete that specific product
  Product.findByIdAndDelete(pid)
    .then((product) => {
      if (!product) {
        res.status(404).json({ message: "Product doesn't exist" });
      } else {
        res.status(200).json(product);
      }
    })
    .catch((err) => {
      res.status(400).json({ error: err.message });
    });
};

// Updates a product
const updateProductById = (req, res) => {
  // Get the product id from params
  const { pid } = req.params;

  // Validate if its a valid mongoose object id
  if (!mongoose.Types.ObjectId.isValid(pid)) {
    return res.status(404).json({ message: "Invalid product id" });
  }

  //Update that specific product with data in req.body
  Product.findByIdAndUpdate(
    { _id: pid },
    {
      ...req.body,
    }
  )
    .then((product) => {
      if (!product) {
        res.status(400).json({ message: "Product doesn't exist" });
      } else {
        res.status(200).json(product);
      }
    })
    .catch((err) => res.status(400).json({ error: err.message }));
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  deleteProductById,
  updateProductById,
};
