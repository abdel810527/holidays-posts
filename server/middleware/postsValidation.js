const { body } = require("express-validator");

module.exports = [
  body("country")
    .trim(),
  body("place")
    .trim(),
  body("text")
  .trim()  
];
