const httpStatus = require('http-status');
const pick = require('../utils/pick');
const catchAsync = require('../utils/catchAsync');
const { taskService, boardColumnsService, sprintService } = require('../services');
const { Types } = require('mongoose');
const messages = require('../utils/messages').taskMsg;
const taskProperties = require('../config/task');
const mongoose = require('mongoose');

/**
 * TO CREATE TASK
 */
const createTask = catchAsync(async (req, res) => {
  req.body.reportedBy = Types.ObjectId(`${req.user.id}`);
  const body = {
    ...req.body,
    status: await taskService.getTaskStatus(req.body.projectId, req.body?.status)
  };
  const task = await taskService.createTask(body);
  await sprintService.updateTaskIdInSprint(req.body.sprintId, task._id);
  res.status(httpStatus.CREATED).send(task);
});

/**
 * TO GET TASK BY ID
 */
const getTaskById = catchAsync(async (req, res) => {
  const task = await taskService.getTask(req.params.taskId);
  res.status(200).send(task);
});

/**
 * TO UPDATE TASK BY ID
 */
const updateTaskById = catchAsync(async (req, res) => {
  const updatedTask = await taskService.updateTask(req.params.taskId, req.body);
  res.status(200).send(updatedTask);
});

/**
 * TO DELETE TASK BY ID
 */
const deleteTaskById = catchAsync(async (req, res) => {
  await taskService.deleteTask(req.params.taskId);
  res.status(200).send({ message: messages.deleted });
});

/**
 * TO GET TASKS BY USER_ID
 */
const getTaskByUserId = catchAsync(async (req, res) => {
  const tasks = await taskService.getUserTasks(req.user.id);
  res.status(200).send(tasks);
});

const getTasksBySprintId = catchAsync(async (req, res) => {
  const filter = {
    projectId: req.body.projectId,
    sprintId: req.body.sprintId,
  };
  const options = {
    select: 'id title type status assignedTo index projectId sprintId',
  };
  const tasks = await taskService.getTasksBySprintId(filter, options);
  res.status(httpStatus.OK).send({ ...tasks });
});

const getTaskStaticProperties = catchAsync(async (req, res) => {
  res.status(httpStatus.OK).send({ ...taskProperties });
});

const updateTaskStatus = catchAsync(async (req, res) => {
  const task = await taskService.updateTaskStatus(req.params.taskId, req.body.toStatus);
  res.status(200).send({ message: messages.statusUpdated, task });
});

module.exports = {
  createTask,
  getTaskById,
  updateTaskById,
  deleteTaskById,
  getTaskByUserId,
  getTasksBySprintId,
  getTaskStaticProperties,
  updateTaskStatus
};
