const { check } = require("express-validator");
const validatorMiddleware = require("../middlewares/validator.middleware");

exports.getCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid Category ID..."),
  validatorMiddleware,
];

exports.createCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("Category name is required")
    .isLength({ min: 3 })
    .withMessage("Too short category name")
    .isLength({ max: 32 })
    .withMessage("Too long category name"),
  validatorMiddleware,
];

exports.updateCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid Category ID..."),
  validatorMiddleware,
];

exports.deleteCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid Category ID..."),
  validatorMiddleware,
];
