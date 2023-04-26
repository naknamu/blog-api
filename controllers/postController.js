const Post = require("../model/post");
const asyncHandler = require('express-async-handler')


// Display list of all Blog Posts
blogPost_list = asyncHandler( async(req, res, next) => {
    res.send("NOT IMPLEMENTED: Blog Post LIST")
})

// Display detail page for a specific Blog Post.
blogPost_detail = asyncHandler(async (req, res, next) => {
    res.send(`NOT IMPLEMENTED: Blog Post detail: ${req.params.postid}`);
});

// Display Blog Post create form on GET.
blogPost_create_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Blog Post create GET");
});

// Handle Blog Post create on POST.
blogPost_create_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Blog Post create POST");
});

// Display Blog Post delete form on GET.
blogPost_delete_get = asyncHandler(async (req, res, next) => {
    res.send(`NOT IMPLEMENTED: Blog Post delete GET: ${req.params.postid} `);
});

// Handle Blog Post delete on POST.
blogPost_delete_post = asyncHandler(async (req, res, next) => {
    res.send(`NOT IMPLEMENTED: Blog Post delete POST: ${req.params.postid}`);
});

// Display Blog Post update form on GET.
blogPost_update_get = asyncHandler(async (req, res, next) => {
    res.send(`NOT IMPLEMENTED: Blog Post update GET: ${req.params.postid}`);
});

// Handle Blog Post update on POST.
blogPost_update_post = asyncHandler(async (req, res, next) => {
    res.send(`NOT IMPLEMENTED: Blog Post update POST: ${req.params.postid}`);
});

module.exports = {
    blogPost_list,
    blogPost_detail,
    blogPost_create_get,
    blogPost_create_post,
    blogPost_delete_get,
    blogPost_delete_post,
    blogPost_update_get,
    blogPost_update_post
}

