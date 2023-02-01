module.exports = (req, res, next) => {
    const redirectTo = req.query.redirectTo || '/';

    // if is already logged in, redirect to desired page
    if(req.session.auth){
        res.redirect(redirectTo);
        return;
    }

    res.render('account/account-signin', {redirectTo});
}