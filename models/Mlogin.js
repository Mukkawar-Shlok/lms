const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { isEmail } = require('validator')
const bcrypt = require('bcrypt');
const userSchema = new Schema({
    name: {
        type: String,
        lowercase: true,
    },
    email: {
        unique: true,
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


//fire after saving user
userSchema.post('save', function (doc, next) {
    console.log('user', doc);
    next();
})

//fire before saving new user
//we are using simple function because if we use the arrow function we would't get the User instance in pre 
userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})


//static method for logging user 
userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email });
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw Error('Incorrect password');
    }
    throw Error('Incorrect email');
};

const User = mongoose.model('user', userSchema);
module.exports = User;