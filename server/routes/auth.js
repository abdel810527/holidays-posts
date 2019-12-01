const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth");

const { signUpValidation, loginValidation } = require("../middleware/authValidation");

router.put("/signup", signUpValidation, authController.putSignup);

router.post("/login", loginValidation, authController.postLogin);

module.exports = router;
