const express = require('express');
const projectController = require('../../controllers/project.controller');
const validate = require('../../middlewares/validate');
const { projectValidation } = require('../../validations');
const auth = require('../../middlewares/auth');
const org = require('../../middlewares/organization');
const project = require('../../middlewares/project');
const router = express.Router();

router
  .route('/')
  .post(auth(), org.getUserOrg, validate(projectValidation.createProject), projectController.createProject)
  .get(auth(), org.getUserOrg, projectController.getProjects);

router
  .route('/:projectId')
  .put(auth(), org.getUserOrg, validate(projectValidation.updateProject), projectController.updateProject);

// Script routes
router
  .route('/:projectId/updateTaskStatusWithBordColumnId')
  .post(auth(), project.getProjectById, projectController.runBoardColumnScript);

// Project Task possible status list
router
  .route('/:projectId/getTaskStatusList')
  .get(auth(), project.getProjectById, projectController.getProjectTaskStatusList);

module.exports = router;

/**
 * @swagger
 * tags:
 *  name: Projects
 *  description: Create and manage projects
 */

/**
 * @swagger
 * /project:
 *   get:
 *     summary: Get all projects
 *     description: Logged in user can fetch their projects.
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
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
 *                     $ref: '#/components/schemas/Project'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /project:
 *   post:
 *     summary: Create new project
 *     tags: [Projects]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - key
 *             properties:
 *               name:
 *                 type: string
 *               key:
 *                 type: string
 *             example:
 *               name: Test project
 *               key: TP
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 project:
 *                   $ref: '#/components/schemas/Project'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /project/{projectId}:
 *   put:
 *     summary: Update project
 *     tags: [Projects]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - key
 *             properties:
 *               name:
 *                 type: string
 *               key:
 *                 type: string
 *               orgId:
 *                 type: string
 *               adminId:
 *                 type: string
 *               epics:
 *                 type: array
 *               labels:
 *                 type: array
 *             example:
 *               name: Test project
 *               key: TP
 *               orgId:
 *               adminId:
 *               epics: ['Epic1', 'Q1']
 *               labels: ['Inline', 'Service']
 *     responses:
 *       "201":
 *         description: Updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 tasks:
 *                   $ref: '#/components/schemas/Project'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */
