const router = require('express').Router();
const ctrl = require('../controllers/auth.controller');
const { auth } = require('../middleware/auth');

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: User authentication
 */


/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       ...
 *     responses:
 *       200: ...
 */
router.post('/signup', ctrl.signup);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful login returns JWT token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Invalid input
 */
router.post('/login', ctrl.login);
router.get('/me', auth, ctrl.me);

module.exports = router;
