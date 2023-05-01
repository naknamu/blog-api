const Comment = require("../model/comment");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

// Display list of all Comments
comment_list = asyncHandler(async (req, res, next) => {
  const comments = await Comment.find(
    { blogPost: req.params.postid },
    "name message createdAt"
  )
  .sort({createdAt: -1})
  .exec();

  res.status(200).json(comments);
});

// Display Comment create form on GET.
comment_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: comment create GET");
});

// Handle Comment create on POST.
comment_create_post = [
  // Validate and sanitize fields.
  body("name")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Name must not be empty")
    .matches(/^[A-Za-z\s]+$/)
    .withMessage("Name must be alphabetic.")
    .escape(),
  body("message")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Your message is required")
    .isLength({ max: 300 })
    .withMessage("You exceeded the maximum characters allowed which is 300")
    .escape(),

  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a Comment object with escaped and trimmed data.
    const comment = new Comment({
      name: req.body.name,
      message: req.body.message,
      blogPost: req.params.postid,
    });

    if (!errors.isEmpty()) {
      res.status(400).json(errors.mapped());
    } else {
      await comment.save();
      res
        .status(200)
        .json({ message: `Successfully saved comment from ${req.body.name}` });
    }
  }),
];

// Display Comment delete form on GET.
comment_delete_get = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: Comment delete GET: ${req.params.commentid} `);
});

// Handle Comment delete on POST.
comment_delete_post = asyncHandler(async (req, res, next) => {
  const comment = await Comment.findByIdAndRemove(req.params.commentid);

  res.status(200).json({ message: `Deleted Comment by: ${comment.name}` });
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
  comment_update_post,
};
