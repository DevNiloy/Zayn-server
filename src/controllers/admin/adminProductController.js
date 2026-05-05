const {
  createProductService,
  updateProductService,
  deleteProductService,
  getProductByIdService,
} = require("../../services/admin/adminProductService");

// POST /api/admin/products
exports.createProduct = async (req, res) => {
  try {
    const product = await createProductService(req.body, req.files);
    res.status(201).json({ message: "Product created successfully", product });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await getProductByIdService(req.params.id);
    // Response-e success flag pathale frontend-e handle kora easy hoy
    res.status(200).json(product);
  } catch (err) {
    res.status(404).json({ message: err.message || "Product not found" });
  }
};

// PUT /api/admin/products/:id
exports.updateProduct = async (req, res) => {
  try {
    const updatedProduct = await updateProductService(
      req.params.id,
      req.body,
      req.files,
    );
    res.json({ message: "Product updated successfully", updatedProduct });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE /api/admin/products/:id
exports.deleteProduct = async (req, res) => {
  try {
    await deleteProductService(req.params.id);
    res.json({ message: "Product and images deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
