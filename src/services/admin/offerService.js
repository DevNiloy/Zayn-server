const Offer = require("../../models/Offer");

exports.updateOfferService = async (data) => {
  // {} mane prothom record-ta khujbe, na thakle create (upsert) korbe
  return await Offer.findOneAndUpdate({}, data, {
    upsert: true,
    new: true,
  });
};

exports.getOfferService = async () => {
  return await Offer.findOne();
};