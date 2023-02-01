const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
require('dotenv').config()

const authenticationRouter = require('./routes/authentication');
const topicExchangePlatformRouter = require('./routes/topic-exchange-platform');

const app = express();

app.set('view engine', 'ejs');

app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

app.use('/auth', authenticationRouter);
app.use('/topic-exchange-platform', topicExchangePlatformRouter);

app.get('/', (req, res, next) => {
    res.render('index');
})

app.listen(process.env.PORT, () => {
    console.log(`App running on Port ${process.env.PORT}`);
})