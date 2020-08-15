const order = require('../controllers/order');
const router = require('express').Router();
const { auth } = require('../utils');

router.get('/', order.getAll);
router.get('/specOrder/:id', order.getSpecOrder)
router.get('/userOrder/:id', order.getUserOrders);

router.post('/', auth(), order.post);

router.put('/editStatus/:id', auth(), order.editStatus);


module.exports = router;