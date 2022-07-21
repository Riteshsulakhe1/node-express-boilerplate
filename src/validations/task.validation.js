const Joi = require('joi');

const createTask = {
    body: Joi.object().keys({
        title: Joi.string().required(),
        description:Joi.string(),
        type: Joi.string(),
        status: Joi.string(),
        priority: Joi.string(),
        assignedTo: Joi.string(),
        assignedBy: Joi.string(),
    }),
};
module.exports ={
    createTask,
};