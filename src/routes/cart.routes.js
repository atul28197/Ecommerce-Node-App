const router = require('express').Router();
const ctrl = require('../controllers/cart.controller');
const { auth } = require('../middleware/auth');


/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: User shopping cart operations
 */


/**
 * @swagger
 * /cart/add:
 *   post:
 *     summary: Add product to cart
 *     tags: [Cart]
 *     security: [ { bearerAuth: [] } ]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [productId, qty]
 *             properties:
 *               productId:
 *                 type: integer
 *               qty:
 *                 type: integer
 *                 minimum: 1
 *     responses:
 *       200:
 *         description: Item added to cart
 *       400:
 *         description: Invalid product or qty
 */
router.post('/add', auth, ctrl.add);


/**
 * @swagger
 * /cart:
 *   get:
 *     summary: Get current user's cart
 *     tags: [Cart]
 *     security: [ { bearerAuth: [] } ]
 *     responses:
 *       200:
 *         description: Cart items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   productId: { type: integer }
 *                   qty: { type: integer }
 *                   price: { type: number }
 */
router.get('/', auth, ctrl.list);

/**
 * @swagger
 * /cart:
 *   delete:
 *     summary: Clear user's cart
 *     tags: [Cart]
 *     security: [ { bearerAuth: [] } ]
 *     responses:
 *       200:
 *         description: Cart cleared
 */
router.delete('/', auth, ctrl.clear);

module.exports = router;
