const Banner = require("../../models/Banner");
const fs = require("fs");
const path = require("path");

// Create New Banner Slide
exports.createBannerService = async (data, file) => {
  if (!file) throw new Error("Banner image is required");
  
  const imagePath = `/uploads/banners/${file.filename}`;
  const newBanner = new Banner({
    ...data,
    image: imagePath,
  });
  
  return await newBanner.save();
};

// Get All Active Banners for Frontend
exports.getBannersService = async () => {
  return await Banner.find({ isActive: true }).sort({ createdAt: -1 });
};

// Delete Banner and its Image from VPS
exports.deleteBannerService = async (id) => {
  const banner = await Banner.findById(id);
  if (!banner) throw new Error("Banner not found");

  // Local storage theke file delete kora
  const filePath = path.join(process.cwd(), "public", banner.image);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }

  return await Banner.findByIdAndDelete(id);
};