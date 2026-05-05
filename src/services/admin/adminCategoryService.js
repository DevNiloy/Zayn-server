const Category = require("../../models/Category");
const SubCategory = require("../../models/SubCategory");
const fs = require("fs");
const path = require("path");

// 1. Create Category
exports.createCategoryService = async (name, file) => {
  const imagePath = file ? `/uploads/categories/${file.filename}` : "";
  const category = new Category({ name, image: imagePath });
  return await category.save();
};

// 2. Update Category
exports.updateCategoryService = async (id, name, file) => {
  const category = await Category.findById(id);
  if (!category) throw new Error("Category not found");

  let imagePath = category.image;
  if (file) {
    // Purono image delete kora
    if (category.image) {
      // process.cwd() use koray ekhon logic-ta project root theke public folder khujbe
      const oldPath = path.join(process.cwd(), "public", category.image);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }
    imagePath = `/uploads/categories/${file.filename}`;
  }

  return await Category.findByIdAndUpdate(
    id,
    { name, image: imagePath },
    { new: true },
  );
};

// 3. Delete Category
exports.deleteCategoryService = async (id) => {
  const category = await Category.findById(id);
  if (!category) throw new Error("Category not found");

  // Image file delete kora
  if (category.image) {
    // process.cwd() path logic
    const fullPath = path.join(process.cwd(), "public", category.image);
    if (fs.existsSync(fullPath)) fs.unlinkSync(fullPath);
  }

  // Oi category-r under-e thaka shob Sub-category-o delete kora (Cascade Delete)
  await SubCategory.deleteMany({ category: id });

  return await Category.findByIdAndDelete(id);
};

exports.getNestedCategoriesService = async () => {
  return await Category.aggregate([
    {
      $lookup: {
        from: "subcategories", // Collection name (mongodb-te lowercase + s hoy)
        localField: "_id",
        foreignField: "category",
        as: "subcategories",
      },
    },
    { $sort: { createdAt: -1 } },
  ]);
};
