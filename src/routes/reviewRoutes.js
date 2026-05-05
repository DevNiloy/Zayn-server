const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");
const { protect } = require("../middlewares/authMiddleware");

// Product ID dhore review POST hobe
router.post("/:id/reviews", protect, reviewController.createProductReview);

module.exports = router;