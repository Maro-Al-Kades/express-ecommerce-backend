const express = require("express");

const { getProducts } = require("../actions/product.actions.js");
const { createProduct } = require("../actions/product.actions.js");
const { getProduct } = require("../actions/product.actions.js");
const { updateProduct } = require("../actions/product.actions.js");
const { DeleteProduct } = require("../actions/product.actions.js");

const {
  getProductValidator,
  updateProductValidator,
  createProductValidator,
  deleteProductValidator,
} = require("../validations/product.validator.js");

const router = express.Router();

router.route("/").get(getProducts).post(createProductValidator, createProduct);
router
  .route("/:id")
  .get(getProductValidator, getProduct)
  .put(updateProductValidator, updateProduct)
  .delete(deleteProductValidator, DeleteProduct);

module.exports = router;
