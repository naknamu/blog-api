const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slugify = require("slugify");

const tagSchema = new Schema({
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
tagSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/api/tags/${this._id}`;
});

tagSchema.pre("save", function (next) {
  // Set slug based from the name
  const tag = this;
  try {
    const slug = slugify(tag.name, { lower: true, strict: true });
    tag.slug = slug;
  } catch (error) {
    next(error); // Pass the error to the next middleware
  }

  next();
});

module.exports = mongoose.model("Tag", tagSchema);
