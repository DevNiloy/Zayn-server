const Order = require("../../models/Order");

// ১. Shob order niye asha
exports.getAllOrdersService = async () => {
  return await Order.find()
    .populate("user", "name email")
    .sort({ createdAt: -1 });
};

// ২. Status update kora
exports.updateStatusService = async (orderId, status) => {
  return await Order.findByIdAndUpdate(
    orderId,
    { status: status },
    { new: true, runValidators: true }
  );
};

// ৩. Order delete kora
exports.deleteOrderService = async (orderId) => {
  return await Order.findByIdAndDelete(orderId);
};

exports.getOrderDetailsService = async (orderId) => {
  return await Order.findById(orderId)
    .populate("user", "name email")
    .populate("orderItems.product", "name image price"); // Jodi product er details lage
};