const express = require("express");
const router = express.Router();
const upload = require("../../config/multer");
const {
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
} = require("../../controllers/admin/adminProductController");

router.post("/", upload.array("images", 10), createProduct);
router.put("/:id", upload.array("images", 10), updateProduct);
router.delete("/:id", deleteProduct);
router.get("/:id", getProductById);

module.exports = router;
 