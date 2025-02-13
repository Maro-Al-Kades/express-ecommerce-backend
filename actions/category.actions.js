const Category = require("../models/category.model");
const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const ApiError = require("../errors/apiError");

//* GET Categories
exports.getCategories = asyncHandler(async (req, res) => {
  const PAGE = req.query.page * 1 || 1;
  const LIMIT = req.query.limit * 1 || 5;
  const SKIP = (PAGE - 1) * LIMIT;

  const categories = await Category.find({}).skip(SKIP).limit(LIMIT);

  res.status(200).json({ results: categories.length, PAGE, data: categories });
});

//* GET Specific Category by id
exports.getCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const category = await Category.findById(id);

  if (!category) {
    return next(new ApiError(`No category found for this id ${id}`, 404));
  }

  res.status(200).json({ data: category });
});

//* POST Create New Category
exports.createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const category = await Category.create({ name, slug: slugify(name) });
  res.status(201).json({ data: category });
});

//* PUT Update Specific Category by id
exports.updateCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;

  const updatedCategory = await Category.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name) },
    { new: true }
  );

  if (!updatedCategory) {
    return next(new ApiError(`No category found for this id ${id}`, 404));
  }

  res.status(200).json({ data: updatedCategory });
});

//* DELETE Specific Category by id
exports.DeleteCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const deletedCategory = await Category.findOneAndDelete({ _id: id });

  if (!deletedCategory) {
    return next(new ApiError(`No category found for this id ${id}`, 404));
  }

  res.status(200).json({ msg: "Category Deleted Successfully..." });
});
