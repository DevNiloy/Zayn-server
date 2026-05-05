const express = require("express");
const router = express.Router();
const offerController = require("../../controllers/admin/offerController");

router.post("/", offerController.updateOffer);
router.get("/", offerController.getOffer);

module.exports = router;