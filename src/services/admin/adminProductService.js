const Product = require("../../models/Product");
const fs = require("fs");
const path = require("path");

// 1. Create Product
exports.createProductService = async (productData, files) => {
  const imagePaths = files
    ? files.map((file) => `/uploads/products/${file.filename}`)
    : [];

  const product = new Product({
    ...productData,
    images: imagePaths,
  });

  return await product.save();
};

exports.getProductByIdService = async (productId) => {
  const product = await Product.findById(productId)
    .populate("category")
    .populate("subCategory");

  if (!product) throw new Error("Product not found");
  return product;
};

// 2. Update Product
exports.updateProductService = async (productId, updateData, files) => {
  const product = await Product.findById(productId);
  if (!product) throw new Error("Product not found");

  let imagePaths = product.images;

  // Jodi notun files thake, ager gulo delete kore notun gulo set kora
  if (files && files.length > 0) {
    // Purono images delete kora logic updated with process.cwd()
    product.images.forEach((img) => {
      const fullPath = path.join(process.cwd(), "public", img);
      if (fs.existsSync(fullPath)) fs.unlinkSync(fullPath);
    });

    imagePaths = files.map((file) => `/uploads/products/${file.filename}`);
  }

  return await Product.findByIdAndUpdate(
    productId,
    { ...updateData, images: imagePaths },
    { new: true },
  );
};

// 3. Delete Product
exports.deleteProductService = async (productId) => {
  const product = await Product.findById(productId);
  if (!product) throw new Error("Product not found");

  // VPS theke images delete kora logic updated with process.cwd()
  product.images.forEach((img) => {
    const fullPath = path.join(process.cwd(), "public", img);
    if (fs.existsSync(fullPath)) fs.unlinkSync(fullPath);
  });

  return await Product.findByIdAndDelete(productId);
};
