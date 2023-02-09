const { Strapi } = require("../../services");

module.exports = async (req, res, next) => {
    const topicId = req.params.topicId;
    const jwt = req.session.auth.jwt;
    const strapi = new Strapi(jwt);

    const populateOptions = [
        'difficulty',
        'module',
        'module.color'
    ]

    const queryObject = {
        populate: populateOptions
    }

    const topic = await strapi.getTopic(topicId, queryObject);

    res.render('topics/single-topic', {topic});
}