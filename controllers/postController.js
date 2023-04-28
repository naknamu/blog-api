const Post = require("../model/post");
const asyncHandler = require('express-async-handler')
const { body, validationResult } = require("express-validator");


// Display list of all Blog Posts
blogPost_list = asyncHandler( async(req, res, next) => {
    const allBlogPost = await Post.find({}, "title published publishedDate").exec();

    res.json(allBlogPost);
})

// Display detail page for a specific Blog Post.
blogPost_detail = asyncHandler(async (req, res, next) => {
    const blogPost = await Post.findOne({_id: req.params.postid}).exec();

    res.json(blogPost);
});

// Display Blog Post create form on GET.
blogPost_create_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Blog Post create GET");
});

// Handle Blog Post create on POST.
blogPost_create_post = [
    // Convert tags to an array
    (req, res, next) => {
        if (!(req.body.tags instanceof Array)) {
          if (typeof req.body.tags === "undefined") req.body.tags = [];
          else req.body.tags = new Array(req.body.tags);
        }

        next();
    },

    // Validate and sanitize fields.
    body("title", "Title must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
    body("content", "Content must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
    body("category", "Category must not be empty").trim().isLength({ min: 1 }).escape(),
    body("tags.*").escape(),
    

    asyncHandler(async (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a Book object with escaped and trimmed data.
        const blogPost = new Post({
            title: req.body.title,
            content: req.body.content,
            category: req.body.category,
            tags: req.body.tags,
            published: req.body.published,
        });

        if (!errors.isEmpty()) {
            res.json(errors.mapped())
        } else {
            await blogPost.save();
            res.json({message: `Successfully saved ${req.body.title}`});
        }
    }
)];

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

