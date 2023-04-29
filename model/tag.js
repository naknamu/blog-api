const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tagSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  detail: {
    type: String,
    required: true,
  },
});

// Virtual for blogPost's URL
tagSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/api/tags/${this._id}`;
});

module.exports = mongoose.model("Tag", tagSchema);
