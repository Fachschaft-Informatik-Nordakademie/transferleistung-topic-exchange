const {Strapi} = require("../../services");
module.exports = async (req, res, next) => {
    const loginToken = req.query.loginToken;

    const strapi = new Strapi();
    req.session.auth = await strapi.loginViaToken(loginToken);
    console.log(req.session);
    res.redirect('/exchange-platform');
}