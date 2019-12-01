const { validationResult } = require("express-validator");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const handleValidationError = req => {
  const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    const error = new Error("Email or password incorrect.");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
};

const error422 = message => {
  const error = new Error(message);
  error.statusCode = 422;
  throw error;
};

// ----------------------------------------------

const putSignup = (req, res, next) => {
  handleValidationError(req);

  const email = req.body.email;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const password = req.body.password;

  bcrypt
    .hash(password, 12)
    .then(hashedPassword => {
      const newUser = User({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashedPassword
      });
      return newUser.save();
    })
    .then(user => {
      res.status(200).json({
        message: "User added",
        userId: user._id
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

const postLogin = (req, res, next) => {
  handleValidationError(req);

  const email = req.body.email;
  const password = req.body.password;
  let retrievedUser;

  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        error422("Email or password incorrect.");
      }
      retrievedUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then(isEqual => {
      if (!isEqual) {
        error422("Password incorrect.");
      }

      const token = jwt.sign(
        {
          email: retrievedUser.email,
          userId: retrievedUser._id
        },
        "thisisamicropostholidaysecretornotmaybe",
        {
          expiresIn: "10h"
        }
      );

      res.status(200).json({
        message: "Logged in succesfully",
        userId: retrievedUser._id,
        firstName: retrievedUser.firstName,
        lastName: retrievedUser.lastName,
        token
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

module.exports = {
  putSignup,
  postLogin
};
