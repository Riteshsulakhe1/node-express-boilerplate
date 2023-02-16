const httpStatus = require('http-status');
const pick = require('../utils/pick');
const catchAsync = require('../utils/catchAsync');
const { taskService } = require('../services');
const {Types} = require('mongoose');
const messages = require('../utils/messages').taskMsg;

/**
 * TO CREATE TASK
 */
const createTask = catchAsync(async (req, res) => {
    req.body.createdBy = Types.ObjectId(`${req.user.id}`);
    const task = await taskService.createTask(req.body);
    res.status(httpStatus.CREATED).send(task);
});

/**
 * TO GET TASK BY ID
 */
const getTaskById = catchAsync(async(req,res)=>{
    const task = await taskService.getTask(req.params.taskId);
    res.status(200).send(task);
});

/**
 * TO UPDATE TASK BY ID
 */
const updateTaskById = catchAsync(async(req,res)=>{
    const updatedTask = await taskService.updateTask(req.params.taskId,req.body);
    res.status(200).send(updatedTask);
});

/**
 * TO DELETE TASK BY ID
 */
const deleteTaskById = catchAsync(async(req,res)=>{
    await taskService.deleteTask(req.params.taskId);
    res.status(200).send({message: messages.deleted});
});

/**
 * TO GET TASKS BY USER_ID
 */
const getTaskByUserId = catchAsync(async (req,res)=>{
    const tasks = await taskService.getUserTasks(req.user.id);
    res.status(200).send(tasks);
});

module.exports={
    createTask,
    getTaskById,
    updateTaskById,
    deleteTaskById,
    getTaskByUserId
};