const {getValidator} = require("../../util");
const {body, query} = require("express-validator");
exports.sendLinkValidator = getValidator([
    body('email_prefix').notEmpty().withMessage("Email prefix is empty"),
]);

exports.loginValidator = getValidator([
    query('loginToken').notEmpty().withMessage("loginToken must be provided")
]);