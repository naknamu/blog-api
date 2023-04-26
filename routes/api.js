const express = require("express");
const router = express.Router();

// Require controller modules.
const blogPost_controller = require('../controllers/postController');

// Get API homepage
router.get("/", blogPost_controller.home);

/***  BLOG POSTS ROUTES ***/

// GET request for creating blog post
router.get("/post/create", blogPost_controller.blogPost_create_get);

// POST request for creating blog post
router.post("/post/create", blogPost_controller.blogPost_create_post);

// GET request for deleting blog post
router.get("/post/:id/delete", blogPost_controller.blogPost_delete_get);

// POST request for deleting blog post
router.post("/post/:id/delete", blogPost_controller.blogPost_delete_post);

// GET request for updating blog post
router.get("/post/:id/update", blogPost_controller.blogPost_update_get);

// POST request for updating blog post
router.post("/post/:id/update", blogPost_controller.blogPost_update_post);



module.exports = router;