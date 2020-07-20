const path = require('path')
const express = require('express')
const hbs = require('hbs')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const postSchema = require('./mongoose_models/blog')
const partialsPath = path.join(__dirname, './pages/partials')
const fileupload = require("express-fileupload")

const app = new express()

mongoose.connect('mongodb://localhost:27017/blogdb', {
    useNewUrlParser: true,
});

app.use(fileupload())
app.use(express.static('public'))
app.set('view engine', 'hbs');
app.set('views', './pages')
hbs.registerPartials(partialsPath)

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

app.get('/', async (req, res) => {
    const post = await postSchema.find({})
    res.render('index', {
        post
    })
})

app.get('/about.hbs', (req, res) => {
    res.render('about')
})

app.get('/contact.hbs', (req, res) => {
    res.render('contact')
})

app.get('/post/:id', async (req, res) => {
    const post = await postSchema.findById(req.params.id)
    res.render('post', {
        post
    })
})

app.get('/index.hbs', async (req, res) => {
    const post = await postSchema.find({})
    res.render('index', {
        post
    })
})

app.get('/newpost.hbs', (req, res) => {
    res.render('newpost')
})

app.get('/success.hbs', (req, res) => {
    res.render('success')
})

app.post('/success.hbs', (req, res) => {
    const {
        image
    } = req.files

    image.mv(path.resolve(__dirname, 'public/posts', image.name), (error) => {
        postSchema.create({
            ...req.body,
            image : '/post/${image.name}'},
            (error, blogpost) => {
                res.redirect('/success.hbs')
            })
    })
})

app.listen(4000, () => {
    console.log("Connected to port 4000")
})
