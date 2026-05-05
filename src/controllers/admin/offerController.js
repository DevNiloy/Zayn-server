const offerService = require("../../services/admin/offerService");

exports.updateOffer = async (req, res, next) => {
  try {
    const result = await offerService.updateOfferService(req.body);
    res.status(200).json({
      success: true,
      message: "Offer text updated!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

exports.getOffer = async (req, res, next) => {
  try {
    const result = await offerService.getOfferService();
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};