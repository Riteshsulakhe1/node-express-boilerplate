const Joi = require('joi');

const getSprints = {
  query: Joi.object().keys({
    projectId: Joi.string().required(),
  }),
};

const createSprint = {
  body: Joi.object().keys({
    projectId: Joi.string().required(),
  }),
};

const getSprintTasks = {
  body: Joi.object().keys({
    projectId: Joi.string().required(),
    sprintId: Joi.string().required(),
  }),
};
module.exports = {
  getSprints,
  createSprint,
  getSprintTasks,
};
