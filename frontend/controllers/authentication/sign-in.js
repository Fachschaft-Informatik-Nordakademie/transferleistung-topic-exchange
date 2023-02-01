module.exports = (req, res, next) => {
    const success = Boolean(req.query.success) || false;
    const redirectTo = req.query.redirectTo;

    res.render('account/account-signin', {success, redirectTo});
}