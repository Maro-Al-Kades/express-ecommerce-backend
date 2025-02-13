const express = require("express");
const {
  getCategories,
  createCategory,

  getCategory,
  updateCategory,
  DeleteCategory,
} = require("../actions/category.actions");
const {
  getCategoryValidator,
  updateCategoryValidator,
  createCategoryValidator,
  deleteCategoryValidator,
} = require("../validations/category.validator");
const subCategoriesRoute = require("./subCategory.routes");

const router = express.Router();
router.use("/:categoryId/subcategories", subCategoriesRoute);

router
  .route("/")
  .get(getCategories)
  .post(createCategoryValidator, createCategory);
router
  .route("/:id")
  .get(getCategoryValidator, getCategory)
  .put(updateCategoryValidator, updateCategory)
  .delete(deleteCategoryValidator, DeleteCategory);

module.exports = router;
