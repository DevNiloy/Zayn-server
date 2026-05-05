const adminStatsService = require("../../services/admin/adminStatsService");

exports.getDashboardSummary = async (req, res, next) => {
  try {
    const stats = await adminStatsService.getAdminDashboardStatsService();

    res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (error) {
    next(error);
  }
};
