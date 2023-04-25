const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
    name: {
      type: String,
      default: 'Jodel Del Valle'
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    }
});

userSchema.pre('save', async function(next) {
    const user = this;
    if (user.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
    }
    next();
})

userSchema.methods.checkPassword = async function(password) {
    const user = this;
    const result = await bcrypt.compare(password, user.password);
    return result;
}

module.exports = mongoose.model('User', userSchema);