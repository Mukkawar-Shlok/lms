const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/Mlogin");
const authRo = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const { reAuth, checkuser } = require("./middleware/authMiddle");
const Task = require('./models/task')

// const crypto = require('crypto');
// const multer = require('multer');
// const Gridfs = require('multer-gridfs-storage');
// const Grid = require('gridfs-stream');
// const methodOver = require('method-override');
// const bodyParser = require('body-parser');
// const methodOverride = require('method-override');



//connecting to database
const port = process.env.PORT || 3000;
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


app.get("*", checkuser);
app.use(authRo);

app.get("/home", reAuth, (req, res) => {
    res.render('home', { title: 'home|lmsstige2 ' })
})

app.get('/', reAuth, (req, res) => {
    Task.find()
        .then((result) => {
            res.render('list', { maintitle: 'test', tasks: result })
        })
        .catch((error) => { console.log(error) })
})

app.get('/home/:id', reAuth, (req, res) => {
    const id = req.params.id;
    // console.log(id);
    Task.findById(id)
        .then(result => {
            res.render('details', { tasks: result, title: 'Details|lmsstige2' });
        })
        .catch(err => {
            console.log(err);
        })
})
app.delete('/home/:id', reAuth, async (req, res) => {
    const id = req.params.id;
    Task.findByIdAndDelete(id)
        .then((result) => {
            console.log('in delete then');
            res.json({ redirect: '/home' })
        })
        .catch((err) => { console.log() })
})


app.get('/create', reAuth, (req, res) => {
    res.render('home', { title: 'Create|lmsstige2' })
})

app.post('/create', reAuth, (req, res) => {
    const task = new Task(req.body)

    task.save()
        .then((result) => {
            res.redirect('/')
        })
        .catch((error) => {
            console.log(error);
        })
})

app.get('/course', reAuth, (req, res) => {
    res.render('course')
})