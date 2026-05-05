const SubCategory = require("../../models/SubCategory");
const fs = require("fs");
const path = require("path");

// 1. Create SubCategory
exports.createSubCategoryService = async (data, file) => {
  const imagePath = file ? `/uploads/subcategories/${file.filename}` : "";
  const subCategory = new SubCategory({
    ...data,
    image: imagePath,
  });
  return await subCategory.save();
};

// 2. Update SubCategory (Added for completeness)
exports.updateSubCategoryService = async (id, data, file) => {
  const sub = await SubCategory.findById(id);
  if (!sub) throw new Error("SubCategory not found");

  let imagePath = sub.image;
  if (file) {
    // Purono image delete kora
    if (sub.image) {
      const oldPath = path.join(process.cwd(), "public", sub.image);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }
    imagePath = `/uploads/subcategories/${file.filename}`;
  }

  return await SubCategory.findByIdAndUpdate(
    id,
    { ...data, image: imagePath },
    { new: true }
  );
};

// 3. Delete SubCategory
exports.deleteSubCategoryService = async (id) => {
  const sub = await SubCategory.findById(id);
  if (!sub) throw new Error("SubCategory not found");

  // Image file delete logic with process.cwd()
  if (sub.image) {
    const fullPath = path.join(process.cwd(), "public", sub.image);
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
    }
  }
  
  return await SubCategory.findByIdAndDelete(id);
};