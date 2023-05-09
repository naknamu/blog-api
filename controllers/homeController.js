const Post = require("../model/post");
const Category = require("../model/category");
const Tag = require("../model/tag");
const Comment = require("../model/comment");
const User = require("../model/user");

const asyncHandler = require("express-async-handler");

// SITE HOMEPAGE
home = asyncHandler(async (req, res, next) => {
  // Get details of published blog posts, categories and tags (in parallel)
  const [blogPosts, categories, tags, comments, users] = await Promise.all([
    Post.countDocuments().exec(),
    Category.countDocuments().exec(),
    Tag.countDocuments().exec(),
    Comment.countDocuments().exec(),
    User.countDocuments().exec(),
  ]);

  const data = {
    blog_count: blogPosts,
    category_count: categories,
    tag_count: tags,
    comment_count: comments,
    user_count: users,
  };

  res.status(200).json(data);
});

module.exports = { home };
