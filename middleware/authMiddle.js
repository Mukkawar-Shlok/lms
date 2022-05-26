const jwt = require('jsonwebtoken');
const User = require('../models/Mlogin');

const reAuth = (req, res, next) => {
    const token = req.cookies.jwt;

    //check if  exits and valid
    if (token) {
        jwt.verify(token, 'naofumi', (err, decodedtoken) => {
            if (err) {
                console.log(err.message);
                res.redirect('/login');
            } else {
                console.log(decodedtoken);
                next();
            }
        })
    }
    else {
        res.redirect('/login');
    }
}


//current user

const checkuser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, 'naofumi', async (err, decodedtoken) => {
            if (err) {
                res.locals.user = null;
                next();
            } else {
                let user = await User.findById(decodedtoken.id);
                res.locals.user = user;
                next();
            }
        });
    } else {
        res.locals.user = null;
        next();
    }
};



module.exports = { reAuth, checkuser };