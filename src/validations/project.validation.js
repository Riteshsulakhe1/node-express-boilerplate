const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createProject = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    key: Joi.string().required(),
  }),
};

const updateProject = {
  body: Joi.object().keys({
    id: Joi.string().custom(objectId),
    name: Joi.string().required(),
    key: Joi.string().required(),
    adminId: Joi.string().custom(objectId),
    orgId: Joi.string().custom(objectId),
    epics: Joi.array().required(),
    labels: Joi.array().required()
  }),
};

module.exports = {
  createProject,
  updateProject,
};
