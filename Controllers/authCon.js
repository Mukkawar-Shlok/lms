const User = require("../models/Mlogin");
const jwt = require('jsonwebtoken');
const { findById } = require("../models/Mlogin");


// handle errors
const errHandler = (err) => {
    console.log(err.message, err.code);
    let errors = { email: '', password: '' };


    // incorrect email
    if (err.message === 'Incorrect email') {
        errors.email = 'Email is not registerd'
    }

    // incorrect password
    if (err.message === 'Incorrect password') {
        errors.password = 'Password is not correct'
    }


    // duplicate email error
    if (err.code === 11000) {
        errors.email = 'that email is already registered';
        return errors;
    }

    // validation errors
    if (err.message.includes('user validation failed')) {
        // console.log(err);
        Object.values(err.errors).forEach(({ properties }) => {
            // console.log(val);
            // console.log(properties);
            errors[properties.path] = properties.message;
        });
    }

    return errors;
}

//creating tokens
const mage = 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, 'naofumi', {
        expiresIn: mage
    })
}



// controller actions
module.exports.signup_get = (req, res) => {
    res.render('sign');
}

module.exports.login_get = (req, res) => {
    res.render('login');
}

module.exports.signup_post = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = await User.create({ name, email, password });
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, mage: mage * 1000 })
        res.status(201).json({ user: user._id });

    }
    catch (err) {
        const errors = errHandler(err);
        res.status(400).json({ errors });
    }

}

module.exports.login_post = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, mage: mage * 1000 })
        res.status(200).json({ user: user._id });
    } catch (err) {
        const errors = errHandler(err);
        res.status(400).json({ errors });
    }

}

module.exports.logout_get = (req, res) => {
    res.cookie('jwt', "", { mage: 0 });
    res.redirect('/sign')
}

module.exports.front_get = (req, res) => {
    res.render('front')
}

module.exports.profile_get = (req, res) => {

    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, 'naofumi', async (err, decodedtoken) => {
            console.log(decodedtoken);
            let user = await User.findById(decodedtoken.id);
            res.render('profile', { title: 'Profile page|lmsstige2', user })
        });
    }
}


