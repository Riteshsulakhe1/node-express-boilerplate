const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createTask = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    type: Joi.string(),
    projectId: Joi.string().required(),
    sprintId: Joi.string().required(),
  }),
};

const updateTask = {
  params: Joi.object().keys({
    taskId: Joi.required().custom(objectId),
  }),
  body: Joi.object().keys({
    title: Joi.string(),
    description: Joi.string(),
    type: Joi.string(),
    status: Joi.string(),
    priority: Joi.string(),
    assignedTo: Joi.string(),
    assignedBy: Joi.string(),
    projectId: Joi.custom(objectId),
    sprintId: Joi.custom(objectId),
  }),
};

const moveTaskAcrossSprint = {
  params: Joi.object().keys({
    taskId: Joi.required().custom(objectId),
  }),
  body: Joi.object().keys({
    fromSprintId: Joi.string().required(),
    toSprintId: Joi.string().required(),
  }),
};

const updateTaskStatus = {
  params: Joi.object().keys({
    taskId: Joi.required().custom(objectId),
  }),
  body: Joi.object().keys({
    fromStatus: Joi.string().required(),
    toStatus: Joi.string().required()
  }),
};

module.exports = {
  createTask,
  updateTask,
  moveTaskAcrossSprint,
  updateTaskStatus
};
