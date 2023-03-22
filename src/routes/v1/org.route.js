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
 * /org/create:
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
 *             properties:
 *               name:
 *                type: string
 *             examples:
 *                name: 'My Org'
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 org:
 *                   name: My Org
 *                   adminId: 63f39c937a3f396fc00509b0
 *                   id: 63f39c937a3f396fc00509b0
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */
