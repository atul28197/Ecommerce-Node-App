const router = require('express').Router();
const { auth } = require('../middleware/auth');
const { admin } = require('../middleware/admin');

const discountCtrl = require('../controllers/discount.controller');
const adminReport = require('../controllers/admin.report.controller');

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Administrative operations
 */

/**
 * @swagger
 * /admin/discount-codes:
 *   get:
 *     summary: List all discount codes
 *     tags: [Admin]
 *     security: [ { bearerAuth: [] } ]
 *     responses:
 *       200:
 *         description: List of discount codes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   code: { type: string }
 *                   isUsed: { type: boolean }
 *                   createdAt: { type: string, format: date-time }
 *                   updatedAt: { type: string, format: date-time }
 *       403:
 *         description: Forbidden
 *       401:
 *         description: Unauthorized
 */
router.get('/discount-codes', auth, admin, discountCtrl.listAll);

/**
 * @swagger
 * /admin/discount-codes/generate:
 *   post:
 *     summary: Generate discount code if nth order condition satisfied
 *     tags: [Admin]
 *     security: [ { bearerAuth: [] } ]
 *     responses:
 *       200:
 *         description: Discount code generated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: { type: string, example: "Discount code generated." }
 *                 code: { type: string, example: "ABCD12" }
 *       400:
 *         description: Not eligible for generation yet
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error: { type: string }
 *       403:
 *         description: Forbidden
 *       401:
 *         description: Unauthorized
 */
router.post('/discount-codes/generate', auth, admin, discountCtrl.generateIfEligible);

/**
 * @swagger
 * /admin/report:
 *   get:
 *     summary: Get purchase metrics, discount data and audit summary
 *     tags: [Admin]
 *     security: [ { bearerAuth: [] } ]
 *     responses:
 *       200:
 *         description: System report
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalItemsSold:
 *                   type: integer
 *                   example: 42
 *                 totalPurchaseAmount:
 *                   type: number
 *                   example: 1299.50
 *                 totalDiscountAmount:
 *                   type: number
 *                   example: 90.00
 *                 discountCodes:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       code: { type: string }
 *                       isUsed: { type: boolean }
 *                       createdAt: { type: string, format: date-time }
 *                       usedAt: { type: string, format: date-time, nullable: true }
 *       403:
 *         description: Forbidden
 *       401:
 *         description: Unauthorized
 */
router.get('/report', auth, admin, adminReport.getReport);

module.exports = router;
