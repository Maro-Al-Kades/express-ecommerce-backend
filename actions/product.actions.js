const Product = require("../models/product.model");
const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const ApiError = require("../errors/apiError");
const ApiFeatures = require("../api/api.features");

/*
~ GET List of Products (PUBLIC)
^ ${DOMAIN}/api/v1/products
*/
exports.getProducts = asyncHandler(async (req, res) => {
  const documentCounts = await Product.countDocuments();
  const apiFeatures = new ApiFeatures(
    Product.find().populate("category", ""),
    req.query
  )
    .filter()
    .search()
    .sort()
    .limitFields()
    .paginate(documentCounts);

  const { mongooseQuery, paginationResult } = apiFeatures;
  const products = await mongooseQuery;

  res.status(200).json({
    status: "success",
    results: products.length,
    paginationResult,
    data: products,
  });
});

/*
~ GET Specific Product by ID (PUBLIC)
^ ${DOMAIN}/api/v1/products/:id
*/
exports.getProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findById(id).populate({
    path: "category",
    select: "title",
  });

  if (!product) {
    return next(new ApiError(`No product found for this id ${id}`, 404));
  }

  res.status(200).json({ status: "success", data: product });
});

/*
~ POST Create New Product (PRIVATE)
^ ${DOMAIN}/api/v1/products/
*/
exports.createProduct = asyncHandler(async (req, res, next) => {
  try {
    if (!req.body.title) {
      return next(new ApiError("Product title is required", 400));
    }

    req.body.slug = slugify(req.body.title, { lower: true });

    const product = new Product(req.body);
    await product.save();

    res.status(201).json({
      status: "success",
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    next(error);
  }
});

/*
~ PUT  Update Specific Product by ID (PRIVATE)
^ ${DOMAIN}/api/v1/products/:id
*/
exports.updateProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  req.body.slug = slugify(req.body.title);

  const product = await Product.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
  });

  if (!product) {
    return next(new ApiError(`No Product found for this id ${id}`, 404));
  }

  res.status(200).json({ status: "success", data: product });
});

/*
~ DELETE  Delete Specific Product by ID (PRIVATE)
^ ${DOMAIN}/api/v1/products/:id
*/
exports.DeleteProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const deletedProduct = await Product.findOneAndDelete({ _id: id });

  if (!deletedProduct) {
    return next(new ApiError(`No Product found for this id ${id}`, 404));
  }

  res
    .status(204)
    .json({ status: "success", msg: "Product Deleted Successfully..." });
});
