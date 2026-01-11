const router = require('express').Router();
const ctrl = require('../controllers/product.controller');
const { auth } = require('../middleware/auth');
const { admin } = require('../middleware/admin');

router.get('/', ctrl.list);
router.get('/:id', ctrl.get);

// admin protected routes
router.post('/', auth, admin, ctrl.create);
router.put('/:id', auth, admin, ctrl.update);
router.delete('/:id', auth, admin, ctrl.remove);

module.exports = router;
