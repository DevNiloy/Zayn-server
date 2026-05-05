const Category = require("../models/Category");
const SubCategory = require("../models/SubCategory");
const Product = require("../models/Product");
const { getAllProductsService } = require("../services/productService");

// 1. Sidebar Logic: Get Category with Nested Subcategories
exports.getCategoriesWithSubs = async (req, res) => {
  try {
    const categories = await Category.find();
    const fullData = await Promise.all(
      categories.map(async (cat) => {
        const subcategories = await SubCategory.find({ category: cat._id });
        return { ...cat._doc, subcategories };
      }),
    );
    res.json(fullData);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 2. Shop Page: GET /api/products (Now with Search & Pagination)
exports.getProducts = async (req, res) => {
  try {
    // Service ekhon { products, totalCount, page, totalPages } return korche
    const result = await getAllProductsService(req.query);
    
    res.json({
        success: true,
        data: result.products,
        meta: {
            totalCount: result.totalCount,
            totalPages: result.totalPages,
            currentPage: result.page,
            limit: req.query.limit || 12
        }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 3. Homepage: GET /api/products/featured (Tab wise + Limit)
exports.getFeatured = async (req, res) => {
  try {
    const result = await getAllProductsService({ 
        ...req.query, 
        bestSeller: true, 
        limit: req.query.limit || 8 
    });

    res.json({
        success: true,
        data: result.products
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 4. Details Page: GET /api/products/:slug
exports.getProductBySlug = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug }).populate(
      "category subCategory",
    );
    
    if (!product) {
        return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.json({
        success: true,
        data: product
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};