const {validationResult} = require("express-validator");

function getValidator(validatorChain){
    return [...validatorChain, (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).send({
                errors: errors.array()
            });
        }

        next();
    }]
}

module.exports = getValidator;