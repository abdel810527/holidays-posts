const { body } = require("express-validator");

module.exports = {
  signUpValidation: [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email.")
      .normalizeEmail(),
    body("password")
      .trim()
      .isLength({ min: 6 }),
    body(["firstName", "lastName"])
      .trim()
      .not()
      .isEmpty()
  ],
  loginValidation: [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email.")
      .normalizeEmail(),
    body("password")
      .trim()
      .isLength({ min: 6 })
  ]
};
