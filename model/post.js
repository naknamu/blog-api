const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const readingTime = require("reading-time");

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      default: "Jodel Del Valle",
    },
    minute_read: {
      type: Number,
      default: 0,
    },
    content: {
      type: String,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    tags: [
      {
        type: Schema.Types.ObjectId,
        ref: "Tag",
      },
    ],
    published: {
      type: Boolean,
      default: false,
    },
    publishedDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

postSchema.pre("save", function (next) {
  // Set current date and time when published is set to true
  if (this.published) {
    this.publishedDate = new Date();
  }

  // Calculate the minute read based on the content
  const { minutes } = readingTime(this.content);
  this.minute_read = Math.ceil(minutes);

  next();
});

// Virtual for blogPost's URL
postSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/api/posts/${this._id}`;
});

// Export model
module.exports = mongoose.model("Post", postSchema);
