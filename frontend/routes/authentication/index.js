const express = require('express');
const {send_link, login, sign_in} = require("../../controllers/authentication");
const {body} = require("express-validator");
const {sendLinkValidator, loginValidator} = require("./validators");
const router = express.Router();

router.post(
    '/send-link',
    sendLinkValidator,
    send_link
);

router.get(
    '/sign-in',
    sign_in
)

router.get(
    '/login',
    loginValidator,
    login
);

module.exports = router;