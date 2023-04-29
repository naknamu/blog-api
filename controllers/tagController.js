const Tag = require("../model/tag");
const asyncHandler = require("express-async-handler");

// Display list of all tags
tag_list = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: TAG LIST");
});

// Display detail page for a specific tag.
tag_detail = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: tag detail: ${req.params.tagid}`);
});

// Display tag create form on GET.
tag_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: tag create GET");
});

// Handle tag create form on POST.
tag_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: tag create POST");
});

// Display tag delete form on GET.
tag_delete_get = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: tag delete GET: ${req.params.tagid} `);
});

// Handle tag delete on POST.
tag_delete_post = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: tag delete POST: ${req.params.tagid}`);
});

// Display tag update form on GET.
tag_update_get = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: tag update GET: ${req.params.tagid}`);
});

// Handle tag update on POST.
tag_update_post = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: tag update POST: ${req.params.tagid}`);
});

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
