const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const readingTime = require("reading-time");
const slugify = require("slugify");

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
    image_url: {
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
    slug: {
      type: String,
      required: true,
    }
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

  // Set slug based from the title
  const post = this;
  try {
    const slug = slugify(post.title, { lower: true, strict: true });
    post.slug = slug;
  } catch (error) {
    next(error); // Pass the error to the next middleware
  }

  next();
});

// Virtual for blogPost's URL
postSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/api/posts/${this._id}`;
});

// Export model
module.exports = mongoose.model("Post", postSchema);
