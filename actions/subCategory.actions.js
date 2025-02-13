const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const ApiError = require("../errors/apiError");
const SubCategory = require("../models/subCategory.model");

exports.setCategoryIdToBody = (req, res, next) => {
  if (!req.body.category) req.body.category = req.params.categoryId;
  next();
};

//* POST Create New SubCategory - ${DOMAIN}/api/v1/subCategories
exports.createSubCategory = asyncHandler(async (req, res) => {
  const { name, category } = req.body;

  const subCategory = await SubCategory.create({
    name,
    slug: slugify(name),
    category,
  });

  res.status(201).json({ status: "success", data: subCategory });
});

exports.createFilterObject = (req, res, next) => {
  let filterObject = {};
  if (req.params.categoryId) filterObject = { category: req.params.categoryId };

  req.filterObj = filterObject;
  next();
};

//* GET SubCategories - ${DOMAIN}/api/v1/subCategories
exports.getSubCategories = asyncHandler(async (req, res) => {
  const PAGE = req.query.page * 1 || 1;
  const LIMIT = req.query.limit * 1 || 5;
  const SKIP = (PAGE - 1) * LIMIT;

  const subCategories = await SubCategory.find(req.filterObj)
    .skip(SKIP)
    .limit(LIMIT)
    .populate({ path: "category", select: ["name", "id"] });

  res.status(200).json({
    status: "success",
    results: subCategories.length,
    PAGE,
    data: subCategories,
  });
});

//* GET Specific SubCategory by id - ${DOMAIN}/api/v1/subCategories/:id
exports.getSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const subCategory = await SubCategory.findById(id).populate({
    path: "category",
    select: ["name", "id"],
  });

  if (!subCategory) {
    return next(new ApiError(`No SubCategory found for this id ${id}`, 404));
  }

  res.status(200).json({ status: "success", data: subCategory });
});

//* PUT Update Specific SubCategory by id - ${DOMAIN}/api/v1/subCategories/:id
exports.updateSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name, category } = req.body;

  const subCategory = await SubCategory.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name), category },
    { new: true }
  );

  if (!subCategory) {
    return next(new ApiError(`No subCategory found for this id ${id}`, 404));
  }

  res.status(200).json({ status: "success", data: subCategory });
});

//* DELETE Specific SubCategory by id - ${DOMAIN}/api/v1/subCategories/:id
exports.DeleteSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const deletedSubCategory = await SubCategory.findOneAndDelete({ _id: id });

  if (!deletedSubCategory) {
    return next(new ApiError(`No subCategory found for this id ${id}`, 404));
  }

  res
    .status(200)
    .json({ status: "success", msg: "subCategory Deleted Successfully..." });
});

//* DELETE All SubCategories - ${DOMAIN}/api/v1/subCategories
exports.DeleteSubCategories = asyncHandler(async (req, res, next) => {
  const subCategories = await SubCategory.find({});

  if (!subCategories) {
    return next(new ApiError("No subcategories found to delete", 404));
  }

  await SubCategory.deleteMany();

  res
    .status(200)
    .json({ status: "success", msg: "subCategories Deleted Successfully..." });
});
