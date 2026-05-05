const express = require("express");
const router = express.Router();
const bannerController = require("../../controllers/admin/bannerController");
const upload = require("../../config/multer"); // Apnar banano multer middleware

// Add new banner slide
router.post("/", upload.single("image"), bannerController.addBanner);

// Get all slides (Frontend use korbe)
router.get("/", bannerController.getBanners);

// Delete a slide
router.delete("/:id", bannerController.deleteBanner);

module.exports = router;