const Product = require("../models/Product");

exports.addProductReviewService = async (productId, reviewData) => {
  const product = await Product.findById(productId);

  if (!product) {
    throw new Error("Product not found");
  }

  // ১. Check: Ei user ki agei review diyeche?
  const alreadyReviewed = product.reviews.find(
    (r) => r.user.toString() === reviewData.user.toString()
  );

  if (alreadyReviewed) {
    throw new Error("You have already reviewed this product");
  }

  // ২. Review push kora
  product.reviews.push(reviewData);

  // ৩. Ratings logic update (Model onujayi)
  product.ratings.count = product.reviews.length;
  
  // Average calculation
  const totalRating = product.reviews.reduce((acc, item) => item.rating + acc, 0);
  product.ratings.average = totalRating / product.reviews.length;

  return await product.save();
};