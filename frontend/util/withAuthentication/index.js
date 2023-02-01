const querystring = require('node:querystring');
const jsonwebtoken = require('jsonwebtoken');

function withAuthentication(){
    return (req, res, next) => {
        const redirectTo = req.baseUrl + req.path;
        const redirectPath = '/auth/sign-in?redirectTo=' + redirectTo;

        if(!req.session.auth){
            res.redirect(redirectPath);
            return;
        }

        const jwt = req.session.auth.jwt;
        jsonwebtoken.verify(jwt, process.env.BACKEND_JWT_SECRET, null, (err, decoded) => {
            // redirect if jwt is not valid
            if(err){
                req.session.auth = null
                res.redirect(redirectPath);
                return;
            }

            // redirect if jwt is expired
            if (Date.now() >= decoded.exp * 1000) {
                req.session.auth = null;
                res.redirect(redirectPath);
                return;
            }

            next();
        });
    }
}

module.exports = withAuthentication;