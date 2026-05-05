const bannerService = require("../../services/admin/bannerService");

exports.addBanner = async (req, res, next) => {
  console.log("Terminal Check - Body:", req.body);
  console.log("Terminal Check - File:", req.file);
  try {
    const banner = await bannerService.createBannerService(req.body, req.file);
    res.status(201).json({
      success: true,
      message: "Banner slide added successfully!",
      data: banner,
    });
  } catch (error) {
    next(error);
  }
};

exports.getBanners = async (req, res, next) => {
  try {
    const banners = await bannerService.getBannersService();
    res.status(200).json({
      success: true,
      data: banners,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteBanner = async (req, res, next) => {
  try {
    await bannerService.deleteBannerService(req.params.id);
    res.status(200).json({
      success: true,
      message: "Banner slide deleted!",
    });
  } catch (error) {
    next(error);
  }
};