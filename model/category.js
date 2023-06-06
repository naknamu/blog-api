const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slugify = require("slugify");

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  detail: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  }
});

// Virtual for blogPost's URL
categorySchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/api/categories/${this._id}`;
});

categorySchema.pre("save", function (next) {
  // Set slug based from the name
  const category = this;
  try {
    const slug = slugify(category.name, { lower: true, strict: true });
    category.slug = slug;
  } catch (error) {
    next(error); // Pass the error to the next middleware
  }

  next();
});

module.exports = mongoose.model("Category", categorySchema);
