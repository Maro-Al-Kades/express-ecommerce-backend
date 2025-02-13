const Brand = require("../models/brand.model");
const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const ApiError = require("../errors/apiError");

//* GET Brands
exports.getBrands = asyncHandler(async (req, res) => {
  const PAGE = req.query.page * 1 || 1;
  const LIMIT = req.query.limit * 1 || 5;
  const SKIP = (PAGE - 1) * LIMIT;

  const brands = await Brand.find({}).skip(SKIP).limit(LIMIT);

  res.status(200).json({
    status: "success",
    results: brands.length,
    PAGE,
    data: brands,
  });
});

//* GET Specific Brand by id
exports.getBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const brand = await Brand.findById(id);

  if (!brand) {
    return next(new ApiError(`No Brand found for this id ${id}`, 404));
  }

  res.status(200).json({ status: "success", data: brand });
});

//* POST Create New Brand
exports.createBrand = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const brand = await Brand.create({ name, slug: slugify(name) });
  res.status(201).json({ status: "success", data: brand });
});

//* PUT Update Specific Brand by id
exports.updateBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;

  const updatedBrand = await Brand.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name) },
    { new: true }
  );

  if (!updatedBrand) {
    return next(new ApiError(`No Brand found for this id ${id}`, 404));
  }

  res.status(200).json({ status: "success", data: updatedBrand });
});

//* DELETE Specific Brand by id
exports.DeleteBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const deletedBrand = await Brand.findOneAndDelete({ _id: id });

  if (!deletedBrand) {
    return next(new ApiError(`No Brand found for this id ${id}`, 404));
  }

  res
    .status(200)
    .json({ status: "success", msg: "Brand Deleted Successfully..." });
});
