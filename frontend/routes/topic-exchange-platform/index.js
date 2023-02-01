const express = require('express');
const {render_page} = require("../../controllers/topic-exchange-platform");
const {withAuthentication} = require("../../util/index.");
const router = express.Router();

router.get(
    '/',
    withAuthentication(),
    render_page
);

module.exports = router;