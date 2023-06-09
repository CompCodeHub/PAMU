const mongoose = require("mongoose");
const Product = require("../models/productModel");
const cloudinary = require("../utils/cloudinaryConfig");

// Gets all products
const getProducts = async (req, res) => {
  const pageSize = 2;
  const page = Number(req.query.pageNumber) || 1; // get pagenumber
  const keyword = req.query.keyword
    ? {
        name: { $regex: req.query.keyword, $options: "i" },
      }
    : {}; // get keyword
  const count = await Product.countDocuments({ ...keyword }); // count products with potential keyword

  //Find all products with potential keyword
  Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .then((products) => {
      // Send products, page number, and number of pages
      return res
        .status(200)
        .json({ products, page, pages: Math.ceil(count / pageSize) });
    })
    .catch((err) => {
      return res.status(404).json({ message: "No products found!" });
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
  const { name, image, brand, category, description, price, quantity } =
    req.body;

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
const deleteProductById = async (req, res) => {
  // Get the product id from params
  const { pid } = req.params;

  // Validate if its a valid mongoose object id
  if (!mongoose.Types.ObjectId.isValid(pid)) {
    return res.status(404).json({ message: "Invalid product id" });
  }

  // Delete that specific product
  try {
    const product = await Product.findByIdAndDelete(pid);
    if (!product) {
      res.status(404).json({ message: "Product doesn't exist" });
    } else {
      res.status(200).json(product);
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }

};

// Updates a product
const updateProductById = async (req, res) => {
  // Get the product id from params
  const { pid } = req.params;

  // Validate if its a valid mongoose object id
  if (!mongoose.Types.ObjectId.isValid(pid)) {
    return res.status(404).json({ message: "Invalid product id" });
  }

  // Update product
  try {
    const product = await Product.findByIdAndUpdate({_id: pid}, {...req.body});
    if (!product) {
      res.status(400).json({ message: "Product doesn't exist" });
    } else {

      // If image was updated, delete the old one on cloudinary
      if(req.body.image.id !== product.image.id){
        await cloudinary.uploader.destroy(product.image.id);
      }
      
      res.status(200).json(product);
    }
  } catch (err) {
    res.status(400).json({ error: err.message }) 
  }

  //Update that specific product with data in req.body
  // Product.findByIdAndUpdate(
  //   { _id: pid },
  //   {
  //     ...req.body,
  //   }
  // )
  //   .then((product) => {
  //     if (!product) {
  //       res.status(400).json({ message: "Product doesn't exist" });
  //     } else {
  //       res.status(200).json(product);
  //     }
  //   })
  //   .catch((err) => res.status(400).json({ error: err.message }));
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  deleteProductById,
  updateProductById,
};
