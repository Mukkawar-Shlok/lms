const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/Mlogin");
const authRo = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const { reAuth } = require("./middleware/authMiddle");

// const crypto = require('crypto');
// const multer = require('multer');
// const Gridfs = require('multer-gridfs-storage');
// const Grid = require('gridfs-stream');
// const methodOver = require('method-override');
// const bodyParser = require('body-parser');
// const methodOverride = require('method-override');



//connecting to database
const port = 3000;
const app = express()
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs')
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

//connecting to database
const dbURL = 'mongodb+srv://Shlok:Shlok@cluster0.soeuo.mongodb.net/auth?retryWrites=true&w=majority'

mongoose.connect(dbURL)
    .then((result) => {
        console.log('listening on port 3000');
        app.listen(port)
    })
    .catch((error) => console.log(error));


app.get('/', reAuth, (req, res) => {
    res.render('home')

})

app.use(authRo);