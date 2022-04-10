const jwt = require('jsonwebtoken');

const reAuth = (req, res, next) => {
    const token = req.cookies.jwt;

    //check if  exits and valid
    if (token) {
        jwt.verify(token, 'naofumi', (err, decodedtoken) => {
            if (err) {
                console.log(err.message);
                res.redirec('/login');
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

module.exports = { reAuth };