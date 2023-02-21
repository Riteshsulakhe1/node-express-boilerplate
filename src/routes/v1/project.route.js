const express = require('express');
const projectController = require('../../controllers/project.controller');
const validate = require('../../middlewares/validate');
const { projectValidation } = require('../../validations');
const auth = require('../../middlewares/auth');
const org = require('../../middlewares/organization');

const router = express.Router();

router.route('/').post(auth(), org.getUserOrg, validate(projectValidation.createProject), projectController.createProject);

router.route('/:projectId').put(auth(),org.getUserOrg, validate(projectValidation.updateProject), projectController.updateProject);

module.exports = router;
/**
 * @swagger
 * tags:
 *  name: string (Name of the project)
 *  key: string (Key for the project and it should be unique)
 */
