const mongoose = require("mongoose");

const BrandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Brand Name is Required"],
      unique: [true, "Brand Name is Unique"],
      minLength: [3, "Brand Name must be at least 3 characters"],
      maxLength: [32, "Brand Name must be at most 20 characters"],
    },

    slug: {
      type: String,
      lowercase: true,
    },

    image: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Brand", BrandSchema);
