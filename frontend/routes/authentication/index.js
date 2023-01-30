const express = require('express');
const {send_link, login} = require("../../controllers/authentication");
const {body} = require("express-validator");
const {sendLinkValidator, loginValidator} = require("./validators");
const router = express.Router();

router.post(
    '/send-link',
    sendLinkValidator,
    send_link
);

router.get(
    '/login',
    loginValidator,
    login
);

module.exports = router;