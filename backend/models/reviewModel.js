const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comments: { type: String, required: true },
  },
  { timestamps: true }
);

const Review = mongoose.model("Review", reviewSchema);

module.exports.Review = Review;
module.exports.reviewSchema = reviewSchema;
