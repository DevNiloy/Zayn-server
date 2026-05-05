const express = require("express");
const router = express.Router();
const adminOrderController = require("../../controllers/admin/adminOrderController");
// const { protect, admin } = require("../../middlewares/authMiddleware");

// Admin Routes (Protect ar Admin middleware thaka dorkar)
router.get("/", adminOrderController.getAllOrders);
router.patch("/:id", adminOrderController.updateOrderStatus);
router.delete("/:id", adminOrderController.deleteOrder);
router.get("/:id", adminOrderController.getOrderDetails);

module.exports = router;