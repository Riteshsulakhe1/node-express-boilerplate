const express = require('express');
const projectController = require('../../controllers/project.controller');
const validate = require('../../middlewares/validate');
const { projectValidation } = require('../../validations');
const auth = require('../../middlewares/auth');
const org = require('../../middlewares/organization');

const router = express.Router();

router
  .route('/')
  .post(auth(), org.getUserOrg, validate(projectValidation.createProject), projectController.createProject)
  .get(auth(), org.getUserOrg, projectController.getProjects);

router
  .route('/:projectId')
  .put(auth(), org.getUserOrg, validate(projectValidation.updateProject), projectController.updateProject);

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
 *      post:
 *          summary: Create a project
 *          description: User (Organization admin) can create project.
 *          tags: [Projects]
 *          security:
 *              - bearerAuth: []
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                  schema:
 *                      type: object
 *                      required:
 *                          - name
 *                          - key
 *                      properties:
 *                          name:
 *                              type: string
 *                          key:
 *                              type: string
 *                      example:
 *                          name: Task Manager
 *                          key: TM
 *          responses:
 *            "201":
 *              description: Created
 *              content:
 *                application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    project:
 *                      $ref: '#/components/schemas/Project'
 *                    message: Project created successfully
 *
 *             "422":
 *                description: User don't have access to create project (Only org admin have access)
 *
 *             "409":
 *                description: Project key is already used. Please change the key
 *
 *      get:
 *          summary: Get list of project
 *          description: It will fetch the list of projects with pagination
 *          tags: [Projects]
 *          security:
 *              - bearerAuth: []
 *          parameters:
 *            - in: query
 *              name: pageSize
 *              schema:
 *                type: number
 *              description: page size in number eg. 10 (it will give 10 records in result)
 *            - in: query
 *              name: page
 *              schema:
 *                type: number
 *              description: page number eg. 1 (it will give 1st page records in result)
 *          example:
 *              query: 'page=1&pageSize=10'
 *          responses:
 *            "200":
 *              description: OK
 *              content:
 *                application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    projects:
 *                      $ref: '#/components/schemas/Project'
 *
 */

/**
 * @swagger
 * /project/{projectId}:
 *      put:
 *          summary: Update project settings
 *          description: User can update project name, key, epics, labels
 *          tags: [Projects]
 *          security:
 *              - bearerAuth: []
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json
 *                  schema:
 *                      required:
 *                          -name
 *                          -key
 *                      properties:
 *                          name:
 *                              type: string
 *                          key:
 *                              type: string
 *                          epics:
 *                              type: array
 *                          labels:
 *                              type: array
 *                      example:
 *                          name: Project 1
 *                          key: p1
 *                          epics: ['epic1']
 *                          labels: ['label1']
 *          responses:
 *              "200":
 *                  description: OK
 *                  content:
 *                      application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              project:
 *                                  $ref: '#/components/schemas/Project'
 *                              message: Project upated successfully
 *
 *              "422":
 *                  description: User don't have access to update project (Only org admin have access)
 *
 */
