const express = require("express");
const router = express.Router();
const adminStatsController = require("../../controllers/admin/adminStatsController");
// const { protect, admin } = require("../../middlewares/authMiddleware");

// GET: /api/admin/stats/summary
router.get("/summary", adminStatsController.getDashboardSummary);

module.exports = router;
