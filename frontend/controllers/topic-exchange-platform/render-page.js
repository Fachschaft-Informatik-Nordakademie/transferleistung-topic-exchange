const {Strapi} = require("../../services");

module.exports = async (req, res, next) => {
    const page = req.query.page || 1;
    const jwt = req.session.auth.jwt;

    const strapi = new Strapi(jwt);
    const topics = await strapi.getTopics();

    res.render('topics/list-with-sidebar', {topics});
}
