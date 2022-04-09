const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { isEmail } = require('validator')

const userSchema = new Schema({
    name: {
        type: String,
        unique: true,
        lowercase: true

    },
    email: {
        type: String,
        required: [true, 'Please enter Email'],
        validate: [isEmail, 'please enter a valid email']
    },
    password: {
        type: String,
        required: true,
        minlength: [4, 'Mininum password length is 4 ']
    }
}, { timestamps: true });

const User = mongoose.model('user', userSchema);
module.exports = User;