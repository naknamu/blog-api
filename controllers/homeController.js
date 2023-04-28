const Post = require("../model/post");
const Category = require("../model/category");
const Tag = require("../model/tag");

const asyncHandler = require('express-async-handler')

// SITE HOMEPAGE
home = asyncHandler(async (req, res, next) => {
    // Get details of published blog posts, categories and tags (in parallel)
    const [
        blogPosts,
        categories,
        tags
    ] =  await Promise.all([
        Post.find({},  "title minute_read category published publishedDate").sort({createdAt: -1}).exec(),
        Category.find({}, "name").sort({name: 1}).exec(),
        Tag.find({}, "name").sort({name: 1}).exec()
    ])

    const data = {
        blogPosts,
        categories,
        tags
    }

    res.json(data);
});

module.exports = {home};