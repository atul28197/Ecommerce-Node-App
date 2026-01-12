const router = require('express').Router();
const { auth } = require('../middleware/auth');
const ctrl = require('../controllers/checkout.controller');


/**
 * @swagger
 * tags:
 *   name: Checkout
 *   description: Checkout flow & discount application
 */

/**
 * @swagger
 * /checkout:
 *   post:
 *     summary: Checkout current user's cart and optionally apply discount code
 *     tags: [Checkout]
 *     security: [ { bearerAuth: [] } ]
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *                 description: Optional discount code
 *     responses:
 *       200:
 *         description: Order completed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 subtotal:
 *                   type: number
 *                   example: 50
 *                 discount:
 *                   type: number
 *                   example: 5
 *                 total:
 *                   type: number
 *                   example: 45
 *                 generatedCode:
 *                   type: string
 *                   nullable: true
 *                   description: Discount code issued for next Nth order
 *       400:
 *         description: Invalid discount code or empty cart
 *       401:
 *         description: Unauthorized
 */
router.post('/', auth, ctrl.checkout);

module.exports = router;
