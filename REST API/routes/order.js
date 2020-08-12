const order = require('../controllers/order');
const router = require('express').Router();
const { auth } = require('../utils');

router.get('/:id', order.getUserOrders);

router.post('/', auth(), order.post);

module.exports = router;