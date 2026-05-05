const orderService = require("../services/newOrderService");
exports.placeOrder = async (req, res, next) => {
  try {
    const { orderItems } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ success: false, message: "Cart is empty" });
    }

    const userId = req.user ? req.user._id : null;

    const savedOrder = await orderService.createOrderService(
      req.body,
      userId
    );

    res.status(201).json({
      success: true,
      message: "Order placed successfully!",
      data: savedOrder,
    });
  } catch (error) {
    next(error);
  }
};