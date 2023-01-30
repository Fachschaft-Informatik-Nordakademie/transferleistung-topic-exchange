const { Strapi } = require('../../services');

module.exports = async (req, res, next) => {
    const email = req.body.email;

    const strapi = new Strapi();
    await strapi.getPasswordlessAuthenticationLink(email);
    res.redirect('/');
}