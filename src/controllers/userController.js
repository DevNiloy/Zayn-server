const userService = require("../services/userService");

// User-er nijer order dekhar controller
exports.getMyOrders = async (req, res, next) => {
  try {
    const orders = await userService.getUserOrdersService(req.user._id);

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders,
    });
  } catch (error) {
    next(error);
  }
};

// Admin-er jonno shob user dekhar controller
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await userService.getAllUsersService();

    res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    next(error);
  }
};
