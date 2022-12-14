const { check } = require("express-validator");

exports.createUser = [
  check("firstName")
    .notEmpty()
    .withMessage("Firstname is required")
    .isLength({ min: 3 })
    .withMessage("At least 3 characters are required"),
  check("lastName")
    .notEmpty()
    .withMessage("Lastname is required")
    .isLength({ min: 3 })
    .withMessage("At least 3 characters are required"),
  check("email")
    .isEmail()
    .withMessage("Email format not valid")
    .notEmpty()
    .withMessage("Email is required"),
  check("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("At least 6 characters are required"),
  check("isAdmin").isBoolean().withMessage("Only boolean values allowed"),
];
exports.updateUser = [
  check("firstName")
    .notEmpty()
    .withMessage("Firstname is required")
    .isLength({ min: 3 })
    .withMessage("At least 3 characters are required"),
  check("lastName")
    .notEmpty()
    .withMessage("Lastname is required")
    .isLength({ min: 3 })
    .withMessage("At least 3 characters are required"),
  check("email")
    .isEmail()
    .withMessage("Email format not valid")
    .notEmpty()
    .withMessage("Email is required"),
  check("isAdmin").isBoolean().withMessage("Only boolean values allowed"),
];