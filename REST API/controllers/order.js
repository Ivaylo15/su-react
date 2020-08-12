const User = require('../models/User');
const Book = require('../models/Book');
const Order = require('../models/Order');

module.exports = {
    getUserOrders: (req, res, next) => {
        Order.find()
            .then((orders) => res.send(orders))
            .catch(next);
    },

    post: (req, res, next) => {
        const { products, price, payment } = req.body;
        const { _id } = req.user;

        Order.create({status: 'New Order', user: _id, products, price, payment})
            .then((createdOrder) => {
                return Promise.all([
                    User.updateOne({ _id }, {$push: {order: createdOrder}}),
                    User.updateOne({ _id }, {$set: {cart: []}}),
                ]);
            })
            .then(([modifiedObj, orderObj]) => {
                res.send(orderObj);
            })
            .catch(next);
    },
}