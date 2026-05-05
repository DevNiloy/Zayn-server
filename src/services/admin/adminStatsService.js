const Order = require("../../models/Order");
const Product = require("../../models/Product");
const User = require("../../models/User");

exports.getAdminDashboardStatsService = async () => {
  //Total Sales & Status wise Order Count (Aggregation)
  const stats = await Order.aggregate([
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
        totalSales: { $sum: "$totalPrice" },
      },
    },
  ]);

  // Total Products & Users Count
  const totalProducts = await Product.countDocuments();
  const totalUsers = await User.countDocuments();

  // Summary Object banano
  const summary = {
    totalProducts,
    totalUsers,
    orders: {
      pending: 0,
      confirmed: 0,
      shipped: 0,
      delivered: 0,
      cancelled: 0,
    },
    totalRevenue: 0,
  };

  // Aggregation result theke summary populate kora
  stats.forEach((stat) => {
    const status = stat._id.toLowerCase();
    if (summary.orders.hasOwnProperty(status)) {
      summary.orders[status] = stat.count;
    }
    // Shudhu delivered order-er taka revenue-te jog hobe
    if (status === "delivered") {
      summary.totalRevenue = stat.totalSales;
    }
  });

  return summary;
};