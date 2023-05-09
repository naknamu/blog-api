const Post = require("../model/post");
const Category = require("../model/category");
const Tag = require("../model/tag");

const asyncHandler = require("express-async-handler");

// SITE HOMEPAGE
home = asyncHandler(async (req, res, next) => {
  // Get details of published blog posts, categories and tags (in parallel)
  const [blogPosts, categories, tags] = await Promise.all([
    Post.countDocuments().exec(),
    Category.countDocuments().exec(),
    Tag.countDocuments().exec(),
  ]);

  const data = {
    blog_count: blogPosts,
    category_count: categories,
    tag_count: tags,
  };

  res.status(200).json(data);
});

module.exports = { home };
