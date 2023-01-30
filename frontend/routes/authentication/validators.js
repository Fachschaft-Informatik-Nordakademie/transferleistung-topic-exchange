const {getValidator} = require("../../util/index.");
const {body, query} = require("express-validator");
exports.sendLinkValidator = getValidator([
    body('email').isEmail().withMessage("must be an email"),
    body('email').custom(value => {
        if(typeof value !== 'string'){
            throw new Error("email must be existent");
        }

        if(!value.endsWith('@nordakademie.de')){
            throw new Error("Email must end with '@nordakademie.de'");
        }

        return true
    })
]);

exports.loginValidator = getValidator([
    query('loginToken').notEmpty().withMessage("loginToken must be provided")
]);