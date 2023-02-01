const {Strapi} = require("../../services");
const querystring = require('node:querystring');

module.exports = async (req, res, next) => {
    const loginToken = req.query.loginToken;

    const strapi = new Strapi();
    req.session.auth = await strapi.loginViaToken(loginToken);

    let redirectPath = req.session.auth.context.redirectTo || '/topic-exchange-platform';
    res.redirect(redirectPath);
}