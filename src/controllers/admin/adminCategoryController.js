const {
  createCategoryService,
  updateCategoryService,
  deleteCategoryService,
  getNestedCategoriesService,
} = require("../../services/admin/adminCategoryService");

const {
  createSubCategoryService,
  deleteSubCategoryService,
  updateSubCategoryService,
} = require("../../services/admin/adminSubCategoryService");

// --- Category Controllers ---

exports.createCategory = async (req, res, next) => {
  // next add kora holo
  try {
    const category = await createCategoryService(req.body.name, req.file);
    res.status(201).json(category);
  } catch (err) {
    next(err); // Ekhon error global error handler-e jabe
  }
};

exports.updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const category = await updateCategoryService(id, name, req.file);
    res.json({ message: "Category updated successfully", category });
  } catch (err) {
    next(err);
  }
};

exports.getNestedCategories = async (req, res, next) => {
  try {
    const categories = await getNestedCategoriesService();
    res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteCategory = async (req, res, next) => {
  try {
    await deleteCategoryService(req.params.id);
    res.json({ message: "Category and its sub-categories deleted" });
  } catch (err) {
    next(err);
  }
};

// --- Sub-Category Controllers ---

exports.createSubCategory = async (req, res, next) => {
  try {
    const subCategory = await createSubCategoryService(req.body, req.file);
    res.status(201).json(subCategory);
  } catch (err) {
    next(err);
  }
};

exports.deleteSubCategory = async (req, res, next) => {
  try {
    await deleteSubCategoryService(req.params.id);
    res.json({ message: "Sub-category deleted successfully" });
  } catch (err) {
    next(err);
  }
};
