const Category = require('../model/category');
const asyncHandler = require('express-async-handler')

// Display list of all Categories
category_list = asyncHandler( async(req, res, next) => {
    res.send("NOT IMPLEMENTED: Category LIST")
})

// Display detail page for a specific Category.
category_detail = asyncHandler(async (req, res, next) => {
    res.send(`NOT IMPLEMENTED: Category detail: ${req.params.categoryid}`);
});

// Display Category create form on GET.
category_create_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Category create GET");
});

// Handle Category create form on POST.
category_create_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Category create POST");
});

// Display Category delete form on GET.
category_delete_get = asyncHandler(async (req, res, next) => {
    res.send(`NOT IMPLEMENTED: Category delete GET: ${req.params.categoryid} `);
});

// Handle Category delete on POST.
category_delete_post = asyncHandler(async (req, res, next) => {
    res.send(`NOT IMPLEMENTED: Category delete POST: ${req.params.categoryid}`);
});

// Display Category update form on GET.
category_update_get = asyncHandler(async (req, res, next) => {
    res.send(`NOT IMPLEMENTED: Category update GET: ${req.params.categoryid}`);
});

// Handle Category update on POST.
category_update_post = asyncHandler(async (req, res, next) => {
    res.send(`NOT IMPLEMENTED: Category update POST: ${req.params.categoryid}`);
});

module.exports = {
    category_list,
    category_detail,
    category_create_get,
    category_create_post,
    category_delete_get,
    category_delete_post,
    category_update_get,
    category_update_post
}