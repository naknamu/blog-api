const express = require("express");
const router = express.Router();

// Require controller modules.
const blogPost_controller = require('../controllers/postController');
const comment_controller = require("../controllers/commentController");

// Get API homepage
router.get("/", blogPost_controller.home);

/***  BLOG POSTS ROUTES ***/

// GET request for creating blog post
router.get("/post/create", blogPost_controller.blogPost_create_get);

// POST request for creating blog post
router.post("/post/create", blogPost_controller.blogPost_create_post);

// GET request for deleting blog post
router.get("/post/:postid/delete", blogPost_controller.blogPost_delete_get);

// POST request for deleting blog post
router.post("/post/:postid/delete", blogPost_controller.blogPost_delete_post);

// GET request for updating blog post
router.get("/post/:postid/update", blogPost_controller.blogPost_update_get);

// POST request for updating blog post
router.post("/post/:postid/update", blogPost_controller.blogPost_update_post);

// GET request for list of blog post
router.get("/posts", blogPost_controller.blogPost_list);

// GET request for a single blog post
router.get("/posts/:postid", blogPost_controller.blogPost_detail);

/***  COMMENT ROUTES ***/

// GET request for creating comment
router.get("/posts/:postid/comment/create", comment_controller.comment_create_get)

// POST request for creating comment
router.post("/posts/:postid/comment/create", comment_controller.comment_create_post)

// GET request for deleting comment
router.get("/posts/:postid/comment/:commentid/delete", comment_controller.comment_delete_get)

// POST request for deleting comment
router.post("/posts/:postid/comment/:commentid/delete", comment_controller.comment_delete_post)

// GET request for updating comment
router.get("/posts/:postid/comment/:commentid/update", comment_controller.comment_update_get)

// POST request for updating comment
router.post("/posts/:postid/comment/:commentid/update", comment_controller.comment_update_post)

module.exports = router;