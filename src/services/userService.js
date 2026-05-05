const Order = require("../models/Order");
const User = require("../models/User");

// User-er nijossho order list (My Orders)
exports.getUserOrdersService = async (userId) => {
  return await Order.find({ user: userId })
    .sort({ createdAt: -1 }) // Latest order age
    .populate("orderItems.product", "title images price"); // Product details shoho
};

// Admin-er jonno shob user-er list
exports.getAllUsersService = async () => {
  return await User.find()
    .select("-password") // Password chara data anbe
    .sort({ createdAt: -1 });
};