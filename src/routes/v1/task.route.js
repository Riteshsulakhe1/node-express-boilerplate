const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const taskValidation = require('../../validations/task.validation');
const taskController = require('../../controllers/task.controller');

const router = express.Router();

router
  .route('/')
  .post(auth(), validate(taskValidation.createTask), taskController.createTask)
  .get(auth(), taskController.getTaskByUserId);

router
  .route('/:taskId')
  .get(auth(), taskController.getTaskById)
  .put(auth(), validate(taskValidation.createTask), taskController.updateTaskById)
  .delete(auth(), taskController.deleteTaskById);

module.exports = router;

/**
 * @swagger
 * tags:
 *  name: Tasks
 *  description: Create, update, delete and fetch tasks
 */

/**
 * @swagger
 * /task:
 *   post:
 *     summary: Create a task
 *     description: User can create for themselves.
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *             optional:
 *               -description
 *               -type
 *               -priority
 *               -status
 *             example:
 *               title: Test task
 *               descrition: Demo task
 *               type: task (Optional & default value from server is "task" & accepted values task/bug)
 *               status: to do (Optional & default value from server is "to do" & accepted values are to do/in progress/ready for testing/done)
 *               priority: medium (Optional & default value from server is "medium" & accepted values are low/medium/high)
 *
 *   get:
 *     summary: Get all tasks created by logged in user
 *     description: Logged in user can fetch their created tasks
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *
 */

/**
 * @swagger
 * /task/{id}:
 *   get:
 *     summary: Get a task by taskId
 *     description: To fetch particular task by id.
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *
 *   put:
 *     summary: Update a task
 *     description: Logged in users can only update their own task..
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               type:
 *                 type: string
 *               status:
 *                  type:string
 *               priority
 *                  type:string
 *
 *             example:
 *                  title: task 1
 *                  description: test task
 *                  type: story/task/sub-task/bug  => any one of them
 *                  status: "to do"
 *                  priority: "medium"
 *                  assignedTo: ""
 *                  assignedBy: ""
 *                  createdBy: "61a23c12b3820815b00b555a"
 *                  id: "62d9576f3a95982622597de4"
 *
 *   delete:
 *     summary: Delete a task
 *     description: Logged in users can delete task.
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User id
 *     responses:
 *       "200":
 *         description: No content
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
