const router = require('express').Router();
const { auth } = require('../middleware/auth');
const ctrl = require('../controllers/checkout.controller');

router.post('/', auth, ctrl.checkout);

module.exports = router;
