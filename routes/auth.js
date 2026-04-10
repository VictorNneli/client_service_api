const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const validate = require('../middleware/validate');
const { loginSchema, refreshTokenSchema } = require('../middleware/schemas');

/**
 * @swagger
 * tags:
 *   - name: Authentication
 *     description: API for user authentication
 */

/**
 * @swagger
 * /auth/login:
 *   post:  
 *     summary: User login
 *     tags: [Auth]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 minLength: 6
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: boolean
 *                accessToken:
 *                  type: string
 *                refreshToken:
 *                  type: string
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.post('/login', validate(loginSchema), authController.login);

/**
 * @swagger
 * /auth/refresh:
 *   post:
 *     summary: Refresh access token
 *     tags: [Auth]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string
 *    responses:
 *      200:
 *        description: Token refreshed successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *               success:
 *                 type: boolean
 *               accessToken:
 *                 type: string
 *      400:
 *        description: Validation error
 *      403:
 *        description: Invalid refresh token
 */
router.post('/refresh', validate(refreshTokenSchema), authController.refreshToken);

module.exports = router;