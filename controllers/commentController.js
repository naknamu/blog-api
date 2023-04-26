const Comment = require("../model/comment");
const asyncHandler = require('express-async-handler')

// Display list of all Comments
comment_list = asyncHandler( async(req, res, next) => {
    res.send("NOT IMPLEMENTED: Comment LIST")
})

// Display Comment create form on GET.
comment_create_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: comment create GET");
});

// Handle Comment create on POST.
comment_create_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Comment create POST");
});

// Display Comment delete form on GET.
comment_delete_get = asyncHandler(async (req, res, next) => {
    res.send(`NOT IMPLEMENTED: Comment delete GET: ${req.params.commentid} `);
});

// Handle Comment delete on POST.
comment_delete_post = asyncHandler(async (req, res, next) => {
    res.send(`NOT IMPLEMENTED: Comment delete POST: ${req.params.commentid}`);
});

// Display Comment update form on GET.
comment_update_get = asyncHandler(async (req, res, next) => {
    res.send(`NOT IMPLEMENTED: Comment update GET: ${req.params.commentid}`);
});

// Handle Comment update on POST.
comment_update_post = asyncHandler(async (req, res, next) => {
    res.send(`NOT IMPLEMENTED: Comment update POST: ${req.params.commentid}`);
});

module.exports = {
    comment_list,
    comment_create_get,
    comment_create_post,
    comment_delete_get,
    comment_delete_post,
    comment_update_get,
    comment_update_post
}

