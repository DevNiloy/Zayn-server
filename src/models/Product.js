const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    desc: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discountPrice: {
      type: Number,
      default: 0,
    },
    images: [String], // VPS storage path array

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    subCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
    },

    stock: {
      type: String,
      enum: ["available", "out of stock"],
      default: "available",
    },
    stockQuantity: {
      type: Number,
      default: 0,
    },

    bestSeller: {
      type: Boolean,
      default: false,
    },
    purchaseCount: {
      type: Number,
      default: 0,
    },

    // Ratings logic
    ratings: {
      average: { type: Number, default: 0 },
      count: { type: Number, default: 0 },
    },

    reviews: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        name: String,
        rating: Number,
        comment: String,
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true },
);

// Title theke automatic slug generate korar logic
productSchema.pre("validate", function () {
  // next parameter bad din
  if (this.title && !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .trim()
      .replace(/[^\w ]+/g, "")
      .replace(/ +/g, "-");
  }
  // next() call korar dorkar nai, validate auto sesh hobe
});

module.exports = mongoose.model("Product", productSchema);
