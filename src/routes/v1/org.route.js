const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const orgValidation = require('../../validations/org.validation');
const orgController = require('../../controllers/org.controller');

const router = express.Router();

router.route('/create').post(auth(), validate(orgValidation.createOrganization), orgController.create);

module.exports = router;

/**
 * @swagger
 * tags:
 *  Create organization API and the required field is only "name"
 */

/**
 * @swagger
 * /create:
 *   post:
 *     summary: Create organization
 *     description: User can create only one organization.
 *     tags: [Organization]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 */
