const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const readingTime = require('reading-time');

const blogPostSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: 'Jodel Del Valle'
    },
    minute_read: {
        type: Number,
        default: 0
    },
    content: {
        type: String,
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category",
    },
    tags: [{
        type: Schema.Types.ObjectId,
        ref: "Tag",
    }],
    published: {
        type: Boolean,
        default: false
    },
    publishedDate: {
        type: Date,
    },
}, { timestamp: true })

blogPostSchema.pre('save', function(next) {
    // Set current date and time when published is set to true
    if (this.published) {
        this.publishedDate = new Date();
    }

    // Calculate the minute read based on the content
    const { minutes } = readingTime(this.content);
    this.minute_read = Math.ceil(minutes);

    next();
})

// Virtual for blogPost's URL
blogPostSchema.virtual("url").get(function () {
    // We don't use an arrow function as we'll need the this object
    return `/api/posts/${this._id}`;
});

// Export model
module.exports = mongoose.model("BlogPost", blogPostSchema);