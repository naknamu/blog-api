const asyncHandler = require('express-async-handler')

// SITE HOMEPAGE
home = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Site Home Page");
});

module.exports = {home};