const mongoose = require("mongoose");
const { Review } = require("../models/reviewModel");
const Product = require("../models/productModel");

// Creates a review
const createReview = (req, res) => {
  // Get rating and comment from req.body
  const { rating, comments } = req.body;

  // Get product id from req.params
  const { pid } = req.params;

  Product.findById(pid).then((product) => {
    // Check if already reviewed
    const alreadyReviewed = product.reviews.find(
      (review) => review.reviewer.toString() === req.user._id.toString()
    );

    // Return error if already reviewed
    if (alreadyReviewed) {
      return res.status(400).json({ error: "Product already reviewed" });
    }

    // Create new review
    Review.create({
      name: req.user.name,
      rating,
      comments,
      reviewer: req.user._id,
    })
      .then((review) => {
        // Add review to product
        product.reviews.push(review);

        // Calculate average rating
        product.rating =
          product.reviews.reduce((acc, review) => review.rating + acc, 0) /
          product.reviews.length;

        //Update number of reviews
        product.numReviews = product.reviews.length;

        // Save product
        product.save();

        // Send response
        return res.status(201).json({ message: "Review added successfully" });
      })
      .catch((err) => {
        return res.status(400).json({ error: "Couldn't review product" });
      });
  });

  // Product.findById(pid)
  //   .then((product) => {
  //     // Check if already reviewed
  //     const alreadyReviewed = product.reviews.find(
  //       (review) => review.reviewer.toString() === req.user._id.toString()
  //     );

  //     // Return error if already reviewed
  //     if (alreadyReviewed) {
  //       return res.status(400).json({ error: "Product already reviewed" });
  //     }

  //     // Create new review
  //     Review.create({
  //       name: req.user.name,
  //       rating,
  //       comment,
  //       reviewer: req.user._id,
  //     })
  //       .then((review) => {
  //         // Add review to product
  //         product.reviews.push(review);

  //         // Calculate average rating
  //         product.rating =
  //           product.reviews.reduce((acc, review) => review.rating + acc, 0) /
  //           product.reviews.length;

  //         //Update number of reviews
  //         product.numReviews = product.reviews.length;

  //         // Save product
  //         product.save();

  //         // Send response
  //         return res.status(201).json({ message: "Review added successfully" });
  //       })
  //       .catch(() => {
  //         return res.status(400).json({ error: "Couldn't review product" });
  //       });
  //   })
  //   .catch(() => res.status(404).json({ error: "Product not found" }));
};

module.exports = { createReview };
