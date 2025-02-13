const express = require("express");
const {
  getBrands,
  createBrand,
  getBrand,
  updateBrand,
  DeleteBrand,
} = require("../actions/brand.actions");
const {
  createBrandValidator,
  getBrandValidator,
  updateBrandValidator,
  deleteBrandValidator,
} = require("../validations/brand.validator");

const router = express.Router();

router.route("/").get(getBrands).post(createBrandValidator, createBrand);
router
  .route("/:id")
  .get(getBrandValidator, getBrand)
  .put(updateBrandValidator, updateBrand)
  .delete(deleteBrandValidator, DeleteBrand);

module.exports = router;
