const {validationResult} = require('express-validator');

const validateRequest = (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        const formattedErrors = {};

        errors.array().forEach(error => {
            const field = error.param && error.param !== '' ? error.param : error.path || 'unknown';

            if(!formattedErrors[field]){
                formattedErrors[field] = [error.msg];
            }
        });

       return res.status(400).json({error: formattedErrors});
    }

    next();
};

module.exports = validateRequest;