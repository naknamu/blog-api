const Category = require("../model/category");
const Post = require("../model/post");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

// Display list of all Categories
category_list = asyncHandler(async (req, res, next) => {
  const categories = await Category.find({}).exec();

  res.status(200).json(categories);
});

category_detail = asyncHandler(async (req, res, next) => {

  const category = await Category.findOne({ slug: req.params.slug }).exec();

  const blogPosts = await Post.find({ category: category._id }).exec();

  res.status(200).json({ category, blogPosts });
});

// Display Category create form on GET.
category_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Category create GET");
});

// Handle Category create form on POST.
category_create_post = [
  // Validate and sanitize fields.
  body("name")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Name must not be empty")
    .matches(/^[A-Za-z\s]+$/)
    .withMessage("Name must be alphabetic."),
  body("detail")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Category detail is required"),

  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a Category object with escaped and trimmed data.
    const category = new Category({
      name: req.body.name,
      detail: req.body.detail,
    });

    if (!errors.isEmpty()) {
      res.status(400).json(errors.mapped());
    } else {
      await category.save();
      res
        .status(200)
        .json({ message: `Successfully saved category: ${req.body.name}` });
    }
  }),
];

// Display Category delete form on GET.
category_delete_get = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: Category delete GET: ${req.params.categoryid} `);
});

// Handle Category delete on POST.
category_delete_post = asyncHandler(async (req, res, next) => {
  const category = await Category.findByIdAndRemove(req.params.categoryid);

  res.status(200).json({ message: `Deleted Category: ${category.name}` });
});

// Display Category update form on GET.
category_update_get = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.categoryid).exec();

  res.status(200).json(category);
});

// Handle Category update on POST.
category_update_post = [
  // Validate and sanitize fields.
  body("name")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Name must not be empty")
    .matches(/^[A-Za-z\s]+$/)
    .withMessage("Name must be alphabetic."),
  body("detail")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Category detail is required"),

  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a Category object with escaped and trimmed data.
    const category = new Category({
      name: req.body.name,
      detail: req.body.detail,
      _id: req.params.categoryid,
    });

    if (!errors.isEmpty()) {
      res.status(400).json(errors.mapped());
    } else {
      const updatedCategory = await Category.findByIdAndUpdate(
        req.params.categoryid,
        category,
        {
          new: true, // to return the updated document
          runValidators: true, // to ensure that any validation rules are applied.
          context: "query", //  to ensure that the pre-save middleware is triggered
        }
      );

      // Wait for the update to complete
      await updatedCategory.save();

      res
        .status(200)
        .json({ message: `Successfully updated ${updatedCategory.name}` });
    }
  }),
];

module.exports = {
  category_list,
  category_detail,
  category_create_get,
  category_create_post,
  category_delete_get,
  category_delete_post,
  category_update_get,
  category_update_post,
};
