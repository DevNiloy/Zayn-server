const express = require("express");
const router = express.Router();
const {
  getCategoriesWithSubs,
  getProducts,
  getFeatured,
  getProductBySlug,
} = require("../controllers/productController");

// Categories Route
router.get("/categories", getCategoriesWithSubs);

// Product Routes
router.get("/details/:slug", getProductBySlug);
router.get("/", getProducts); // Filtering (Image 3)
router.get("/featured", getFeatured); // Homepage (Image 2)
// Details (Image 4)

module.exports = router;
