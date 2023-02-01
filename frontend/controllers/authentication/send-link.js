const { Strapi } = require('../../services');

module.exports = async (req, res, next) => {
    const email_prefix = req.body.email_prefix;
    const redirectTo = req.query.redirectTo;

    const email = email_prefix + "@nordakademie.de";
    const context = {
        redirectTo
    }

    const strapi = new Strapi();
    await strapi.getPasswordlessAuthenticationLink(email, context);
    res.render('account/account-signin', {success: true});
}