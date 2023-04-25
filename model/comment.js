const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    name: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true
    },
    blogPost: {
        type: Schema.Types.ObjectId,
        ref: 'BlogPost',
        required: true
    }
}, { timestamp: true });

module.exports = mongoose.model('Comment', commentSchema);