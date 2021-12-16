const { check, validationResult } = require("express-validator");

exports.registerValidator = (username, password) => {
  console.log(username, password);
  return [
    check(username)
      .notEmpty()
      .withMessage("username is required")
      .not()
      .custom((val) => /[^A-za-z0-9\s]/g.test(val))
      .withMessage("Username not use uniq characters"),
    check(password)
      .notEmpty()
      .withMessage("password is required")
      .isLength({ min: 8 })
      .withMessage("password must be 8 characters"),
  ];
};
