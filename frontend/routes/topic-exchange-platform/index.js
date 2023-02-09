const express = require('express');
const {render_page, single_topic} = require("../../controllers/topic-exchange-platform");
const {withAuthentication} = require("../../util/index.");
const router = express.Router();

router.get(
    '/',
    withAuthentication(),
    render_page
);

router.get(
    '/topic/:topicId',
    withAuthentication(),
    single_topic
)

module.exports = router;