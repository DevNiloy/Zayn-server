const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const neworderController = require("../controllers/newOrderController")
// const { protect } = require("../middlewares/authMiddleware");

// router.post("/place-order",  orderController.placeOrder);
router.post("/place-order",  neworderController.placeOrder);

module.exports = router;