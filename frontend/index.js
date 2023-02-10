const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
require('dotenv').config()

const authenticationRouter = require('./routes/authentication');
const topicExchangePlatformRouter = require('./routes/topic-exchange-platform');
const {getStrapiAssetURL} = require("./util");

const app = express();

app.locals = {
    functions: {
        getStrapiAssetURL
    }
}

app.set('view engine', 'ejs');

app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

app.use((req, res, next) => {
    req.session.auth = {
        jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjc1MzY2MTIyLCJleHAiOjE2Nzc5NTgxMjJ9.gVP58RoBjw4Nzq7ktKEtbEElFMvXFpIR3ymGs5xAY9I',
        user: {
            id: 1,
            username: 'Nihad Amin',
            email: 'nihad.amin@nordakademie.de',
            provider: null,
            confirmed: true,
            blocked: false,
            createdAt: '2023-01-26T17:42:43.575Z',
            updatedAt: '2023-01-27T15:31:57.879Z'
        },
        context: { redirectTo: '/topic-exchange-platform/' }
    }

    next();
})

app.use('/auth', authenticationRouter);
app.use('/topic-exchange-platform', topicExchangePlatformRouter);

app.get('/', (req, res, next) => {
    res.render('index');
});

app.listen(process.env.PORT, () => {
    console.log(`App running on Port ${process.env.PORT}`);
})