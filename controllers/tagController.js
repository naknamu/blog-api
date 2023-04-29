const Tag = require("../model/tag");
const Post = require("../model/post");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

// Display list of all tags
tag_list = asyncHandler(async (req, res, next) => {
  const tags = await Tag.find({}).exec();

  res.status(200).json(tags);
});

// Display detail page for a specific tag.
tag_detail = asyncHandler(async (req, res, next) => {
  const [tag, blogPosts] = await Promise.all([
    Tag.findById(req.params.tagid).exec(),
    Post.find({ tags: req.params.tagid }, "title published").exec(),
  ]);

  res.status(200).json({ tag, blogPosts });
});

// Display tag create form on GET.
tag_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: tag create GET");
});

// Handle tag create form on POST.
tag_create_post = [

  // Validate and sanitize fields.
  body("name")
  .trim()
  .isLength({ min: 1 })
  .withMessage("Name must not be empty")
  .matches(/^[A-Za-z\s]+$/)
  .withMessage("Name must be alphabetic.")
  .escape(),
  body("detail")
  .trim()
  .isLength({ min: 1 })
  .withMessage("Tag detail is required")
  .escape(),
  
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a Tag object with escaped and trimmed data.
    const tag = new Tag({
      name: req.body.name,
      detail: req.body.detail,
    });

    if (!errors.isEmpty()) {
      res.status(400).json(errors.mapped());
    } else {
      await tag.save();
      res.status(200).json({ message: `Successfully saved tag: ${req.body.name}` });
    }
  }
)];

// Display tag delete form on GET.
tag_delete_get = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: tag delete GET: ${req.params.tagid} `);
});

// Handle tag delete on POST.
tag_delete_post = asyncHandler(async (req, res, next) => {
  const tag = await Tag.findByIdAndRemove(req.params.tagid);

  res.status(200).json({ message: `Deleted Tag: ${tag.name}` });
});

// Display tag update form on GET.
tag_update_get = asyncHandler(async (req, res, next) => {
  const tag = await Tag.findById(req.params.tagid).exec();

  res.status(200).json(tag);
});

// Handle tag update on POST.
tag_update_post = [

  // Validate and sanitize fields.
  body("name")
  .trim()
  .isLength({ min: 1 })
  .withMessage("Name must not be empty")
  .matches(/^[A-Za-z\s]+$/)
  .withMessage("Name must be alphabetic.")
  .escape(),
  body("detail")
  .trim()
  .isLength({ min: 1 })
  .withMessage("Tag detail is required")
  .escape(),

  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a Tag object with escaped and trimmed data.
    const tag = new Tag({
      name: req.body.name,
      detail: req.body.detail,
      _id: req.params.tagid
    });

    if (!errors.isEmpty()) {
      res.status(400).json(errors.mapped());
    } else {
      const updatedTag = await Tag.findByIdAndUpdate(
        req.params.tagid,
        tag,
        {
          new: true, // to return the updated document
          runValidators: true, // to ensure that any validation rules are applied.
          context: "query", //  to ensure that the pre-save middleware is triggered
        }
      );

      // Wait for the update to complete
      await updatedTag.save();

      res.status(200).json({ message: `Successfully updated ${updatedTag.name}` });
    }
  }
)];

module.exports = {
  tag_list,
  tag_detail,
  tag_create_get,
  tag_create_post,
  tag_delete_get,
  tag_delete_post,
  tag_update_get,
  tag_update_post,
};
