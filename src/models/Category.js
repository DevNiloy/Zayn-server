const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String, unique: true, lowercase: true },
    image: { type: String },
  },
  { timestamps: true },
);

// Async style use korle 'next' parameter ebong next() call konotai lage na
categorySchema.pre("validate", async function () {
  if (this.name && !this.slug) {
    this.slug = this.name
      .toLowerCase()
      .trim()
      .replace(/[^\w ]+/g, "")
      .replace(/ +/g, "-");
  }
});

module.exports = mongoose.model("Category", categorySchema);
