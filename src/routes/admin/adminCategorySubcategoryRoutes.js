const express = require("express");
const router = express.Router();
const upload = require("../../config/multer");
const {
  createCategory,
  updateCategory, // <-- Eta missing chilo
  deleteCategory,
  createSubCategory,
  deleteSubCategory,
  getNestedCategories, // <-- Etao missing chilo
} = require("../../controllers/admin/adminCategoryController");

// Categories
router.post("/", upload.single("image"), createCategory);
router.get("/", upload.single("image"), getNestedCategories);
router.put("/:id", upload.single("image"), updateCategory);
router.delete("/:id", deleteCategory);

// Sub-Categories
router.post("/subcategories", upload.single("image"), createSubCategory);
router.delete("/subcategories/:id", deleteSubCategory);

module.exports = router;
