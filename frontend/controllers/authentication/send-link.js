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
    res.redirect('/auth/sign-in?success=true');
}