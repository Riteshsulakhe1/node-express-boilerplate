const express = require('express');
const { sprintController } = require('../../controllers');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { sprintValidation } = require('../../validations');
const { getProjectById } = require('../../middlewares/project');
const { taskController } = require('../../controllers');

const sprintRouter = express.Router();

sprintRouter
  .route('/')
  .get(auth(), validate(sprintValidation.getSprints), getProjectById, sprintController.getSprints)
  .post(auth(), validate(sprintValidation.createSprint), getProjectById, sprintController.createNewSprint);

sprintRouter
  .route('/getTasks')
  .post(auth(), validate(sprintValidation.getSprintTasks), getProjectById, taskController.getTasksBySprintId);

sprintRouter
  .route('/getBacklog')
  .get(auth(), validate(sprintValidation.getSprints), getProjectById, sprintController.getBacklogIssues);

sprintRouter
  .route('/getBoard')
  .get(auth(), validate(sprintValidation.getSprints), getProjectById, sprintController.getBoardIssues);

// Private Script route 
sprintRouter.route('/updateCollectionWithTaskIds')
  .put(auth(), sprintController.updateSprintCollection);
module.exports = sprintRouter;

/**
 * @swagger
 * tags:
 *   name: Sprint
 *   description: Create, manage and get sprint details
 */

/**
 * @swagger
 * /sprint:
 *   get:
 *     summary: Get all sprints
 *     description: Only admins can retrieve all users.
 *     tags: [Sprint]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: projectId
 *         schema:
 *           type: string
 *         description: User name
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Sprint'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /sprint:
 *   post:
 *     summary: Create new sprint
 *     description: User can create new sprint.
 *     tags: [Sprint]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - projectId
 *             properties:
 *               projectId:
 *                 type: string
 *             example:
 *               projectId: 63f39c937a3f396fc00509b0
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Sprint'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */
/**
 * @swagger
 * /sprint/getTasks:
 *   post:
 *     summary: Get tasks by sprintId
 *     tags: [Sprint]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - sprintId
 *               - projectId
 *             properties:
 *               sprintId:
 *                 type: string
 *               projectId:
 *                 type: string
 *             example:
 *               projectId: 63f39c937a3f396fc00509b0
 *               sprintId: 63f39c937a3f396fc00509b2
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 tasks:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Sprint'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */
