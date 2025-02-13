const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category Name is Required"],
      unique: [true, "Category Name is Unique"],
      minLength: [3, "Category Name must be at least 3 characters"],
      maxLength: [32, "Category Name must be at most 20 characters"],
    },

    slug: {
      type: String,
      lowercase: true,
    },

    image: String,
  },
  { timestamps: true }
);

const categoryModel = mongoose.model("Category", CategorySchema);

module.exports = categoryModel;
