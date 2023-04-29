const express = require("express");
const router = express.Router();

// Require controller modules.
const blogPost_controller = require('../controllers/postController');
const comment_controller = require("../controllers/commentController");
const category_controller = require("../controllers/categoryController");
const tag_controller = require("../controllers/tagController");
const home_controller = require('../controllers/homeController')

/***  HOME ROUTE ***/

// Get API homepage
router.get("/", home_controller.home);

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

// GET request for list of comments in a specific blog
router.get("/posts/:postid/comments", comment_controller.comment_list);


/***  CATEGORY ROUTES ***/

// GET request for creating category
router.get("/category/create", category_controller.category_create_get);

// POST request for creating category
router.post("/category/create", category_controller.category_create_post);

// GET request for deleting category
router.get("/category/:categoryid/delete", category_controller.category_delete_get);

// POST request for deleting category
router.post("/category/:categoryid/delete", category_controller.category_delete_post);

// GET request for updating category
router.get("/category/:categoryid/update", category_controller.category_update_get);

// POST request for updating category
router.post("/category/:categoryid/update", category_controller.category_update_post);

// GET request for list of categories
router.get("/categories", category_controller.category_list);

// GET request for a single category
router.get("/categories/:categoryid", category_controller.category_detail);


/***  TAG ROUTES ***/

// GET request for creating tag
router.get("/tag/create", tag_controller.tag_create_get);

// POST request for creating tag
router.post("/tag/create", tag_controller.tag_create_post);

// GET request for deleting tag
router.get("/tag/:tagid/delete", tag_controller.tag_delete_get);

// POST request for deleting tag
router.post("/tag/:tagid/delete", tag_controller.tag_delete_post);

// GET request for updating tag
router.get("/tag/:tagid/update", tag_controller.tag_update_get);

// POST request for updating tag
router.post("/tag/:tagid/update", tag_controller.tag_update_post);

// GET request for list of tags
router.get("/tags", tag_controller.tag_list);

// GET request for a specific tag
router.get("/tags/:tagid", tag_controller.tag_detail);


module.exports = router;