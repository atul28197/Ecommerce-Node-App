const router = require('express').Router();
const ctrl = require('../controllers/cart.controller');
const { auth } = require('../middleware/auth');

router.post('/add', auth, ctrl.add);
router.get('/', auth, ctrl.list);
router.delete('/', auth, ctrl.clear);

module.exports = router;
