const { Strapi } = require("../../services");
const edjsHTML = require("editorjs-html");
const edjsParser = edjsHTML();

module.exports = async (req, res, next) => {
    const topicId = req.params.topicId;
    const jwt = req.session.auth.jwt;
    const strapi = new Strapi(jwt);

    const populateOptions = [
        'thumbnail',
        'difficulty',
        'module',
        'module.color'
    ]

    const queryObject = {
        populate: populateOptions
    }

    const topic = await strapi.getTopic(topicId, queryObject);
    const editorJSData = JSON.parse(topic.data.content);
    const content = edjsParser.parse(editorJSData);

    res.render('topics/single-topic', {topic, content});
}