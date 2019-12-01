const path = require("path");
const fs = require("fs");
const { validationResult } = require("express-validator");
const Post = require("../models/Post");

const clearImage = filepath => {
  filepath = path.join(__dirname, "..", filepath)
  fs.unlink(filepath, err => console.log(err))
}

const handleValidationError = req => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Fill in all fields please");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
};

const error422 = message => {
  const error = new Error(message);
  error.message = message;
  error.statusCode = 422;
  throw error;
};

// ----------------------------------------------

const addPost = (req, res, next) => {
  handleValidationError(req);

  const country = req.body.country;
  const place = req.body.place;
  const text = req.body.text;
  const imageURL = req.file.path.replace("\\", "/");
  const userIdofToken = req.userId;
  const newPost = Post({
    country: country,
    place: place,
    text: text,
    imageURL: imageURL,
    userId: userIdofToken
  });

  newPost
    .save()
    .then(result => {
      res.status(200).json({
        message: "Post added succesfully",
        data: result
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

const getPosts = (req, res, next) => {
  Post.find({ userId: req.userId })
    .then(result => {
      if (!result) {
        error422("No posts.");
      }

      res.status(200).json({
        message: "Post(s) found",
        data: result
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

const deletePost = (req, res, next) => {
  const postId = req.body.postId;

  Post.findById(postId)
    .then(post => {
      if (!post) {
        error422("No post found");
      }

      clearImage(post.imageURL)
      return Post.findByIdAndDelete(postId)
    })
    .then(result => {
      res.status(200).json({
        message: "Post deleted succesfully",
        data: result
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

const getPost = (req, res, next) => {
  const postId = req.body.postId;

  Post.findById(postId)
    .then(result => {
      if (!result) {
        error422("Post not found");
      }

      res.status(200).json({
        message: "Post found",
        data: result
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

const updatePost = (req, res, next) => {
  handleValidationError(req);

  const country = req.body.country;
  const place = req.body.place;
  const text = req.body.text;
  const imageURL = req.file.path.replace("\\", "/");
  const postId = req.body.postId;
  Post.findById(postId)
    .then(post => {
      if (!post) {
        error422("Post not found");
      }

      if(imageURL !== post.imageURL){
        clearImage(post.imageURL);
      }

      post.country = country;
      post.place = place;
      post.text = text;
      post.imageURL = imageURL;

      return post.save();
    })
    .then(result => {
      res.status(200).json({
        message: "Post updated succesfully",
        data: result
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
  addPost,
  getPosts,
  deletePost,
  getPost,
  updatePost
};
