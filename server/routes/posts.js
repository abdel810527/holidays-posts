const express = require("express");
const postsValidation = require("../middleware/postsValidation");

const tokenized = require("../middleware/is-tokenized");

const router = express.Router();

const postsController = require("../controllers/posts");

router.get("/getposts", tokenized, postsController.getPosts);

router.post("/addpost", tokenized, postsValidation, postsController.addPost);

router.post("/getpost", tokenized, postsController.getPost);

router.post(
  "/updatepost",
  tokenized,
  postsValidation,
  postsController.updatePost
);

router.delete("/deletepost", tokenized, postsController.deletePost);

module.exports = router;
