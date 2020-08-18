const router = require('express').Router();
const { auth } = require('../utils');
const orderItem = require('../controllers/orderItem');

router.get('/', orderItem.getAll);
router.get('/:id', orderItem.getUserOrder);

router.post('/', orderItem.post);

router.put('/changeAmount/:id', orderItem.changeAmount);

router.delete('/:id', orderItem.delete)

module.exports = router;
