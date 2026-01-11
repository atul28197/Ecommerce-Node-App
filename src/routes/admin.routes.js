const router = require('express').Router();
const { auth } = require('../middleware/auth');
const { admin } = require('../middleware/admin');

const discountCtrl = require('../controllers/discount.controller');
const adminReport = require('../controllers/admin.report.controller');


router.get('/discount-codes', auth, admin, discountCtrl.listAll);
router.post('/discount-codes/generate', auth, admin, discountCtrl.generateIfEligible);
router.get('/report', auth, admin, adminReport.getReport);

module.exports = router;
