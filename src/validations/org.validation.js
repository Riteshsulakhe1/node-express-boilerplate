const Joi = require('joi');

const createOrganization = {
    body: Joi.object().keys({
        name: Joi.string().required(),
    })
};

module.exports = {
    createOrganization
};