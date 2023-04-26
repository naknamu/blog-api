const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: {
      type: String,
      required: true,
    },
    detail: {
        type: String,
        required: true
    }
});

// Virtual for blogPost's URL
categorySchema.virtual("url").get(function () {
    // We don't use an arrow function as we'll need the this object
    return `/api/categories/${this._id}`;
});

module.exports = mongoose.model('Category', categorySchema);