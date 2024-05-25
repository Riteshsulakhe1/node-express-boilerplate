const httpStatus = require('http-status');
const { User, Task } = require('../models');
const ApiError = require('../utils/ApiError');
const { objectId } = require('../validations/custom.validation');
const { getInitialColumnByProjectId } = require('./boardColumns.service');
const { Types } = require('mongoose');
/**
 * To create new task
 * @param {*} taskBody
 * @returns {object} created task data
 */
const createTask = async (taskBody) => Task.create(taskBody);

/**
 * To get task by id
 * @param {*} taskId
 * @returns {object} task data for taskId
 */
const getTask = async (taskId) => Task.findById(taskId);

/**
 *
 * @param {*} taskId id of the task to be updated
 * @param {*} updatedBody update task body
 */
const updateTask = async (taskId, updatedBody) => {
  const task = await getTask(taskId);
  if (!task) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Task not found');
  }
  Object.assign(task, updatedBody);
  await task.save();
  return task;
};

/**
 * To delete task by ids
 * @param {*} taskId
 */
const deleteTask = async (taskId) => {
  const task = await getTask(taskId);
  if (!task) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Task not found');
  }
  await task.remove();
  return task;
};

/**
 * To get all the task of user by userId
 * @param {*} userId
 * @returns {[object]} task array
 */
const getUserTasks = async (userId, body) => {
  // return Task.paginate({})
};

const getTasksBySprintId = async (filter, options) => {
  const tasks = await Task.paginate(filter, options);
  return tasks;
};

const updateTaskStatus = async (taskId, status) => {
  const task = await getTask(taskId);
  if (!task) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Task not found');
  }
  Object.assign(task, { status });
  await task.save();
  return task;
};

const getTaskStatus = async (projectId, status) => {
  if (!status || !(status instanceof mongoose.ObjectId)) {
    const initialColumn = await getInitialColumnByProjectId(projectId);
    if (initialColumn) {
      return Types.ObjectId(initialColumn.id);
    }
  } else {
    return status;
  }
}

module.exports = {
  createTask,
  getTask,
  updateTask,
  deleteTask,
  getUserTasks,
  getTasksBySprintId,
  updateTaskStatus,
  getTaskStatus
};
