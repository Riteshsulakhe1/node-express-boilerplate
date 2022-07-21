const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const taskValidation = require('../../validations/task.validation');
const taskController = require('../../controllers/task.controller');

const router = express.Router();

router.route('/')
.post(auth(),validate(taskValidation.createTask),taskController.createTask)
.get(auth(),taskController.getTaskByUserId);

router.route('/:taskId')
.get(auth(),taskController.getTaskById)
.put(auth(), validate(taskValidation.createTask),taskController.updateTaskById)
.delete(auth(),taskController.deleteTaskById)

module.exports = router;