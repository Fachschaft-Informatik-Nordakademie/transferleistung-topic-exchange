const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
require('dotenv').config()

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const authenticationRouter = require('./routes/authentication');

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))

app.use('/auth', authenticationRouter);

app.get('/', (req, res, next) => {
    res.render('index');
})

app.listen(process.env.PORT, () => {
    console.log(`App running on Port ${process.env.PORT}`);
})