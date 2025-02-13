const { check } = require("express-validator");
const validatorMiddleware = require("../middlewares/validator.middleware");

exports.getBrandValidator = [
  check("id").isMongoId().withMessage("Invalid Brand ID..."),
  validatorMiddleware,
];

exports.createBrandValidator = [
  check("name")
    .notEmpty()
    .withMessage("Brand name is required")
    .isLength({ min: 3 })
    .withMessage("Too short Brand name")
    .isLength({ max: 32 })
    .withMessage("Too long Brand name"),
  validatorMiddleware,
];

exports.updateBrandValidator = [
  check("id").isMongoId().withMessage("Invalid Brand ID..."),
  validatorMiddleware,
];

exports.deleteBrandValidator = [
  check("id").isMongoId().withMessage("Invalid Brand ID..."),
  validatorMiddleware,
];
