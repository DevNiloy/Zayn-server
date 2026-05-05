const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { protect } = require("../middlewares/authMiddleware");

// GET: /api/users/my-orders
router.get("/my-orders", protect, userController.getMyOrders);
router.get("/all-user", protect, userController.getAllUsers);

module.exports = router;
