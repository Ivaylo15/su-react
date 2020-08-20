const User = require('../models/User');
const Order = require('../models/Order');

module.exports = {
    getAll: (req, res, next) => {
        Order.find()
            .then((orders) => res.send(orders))
            .catch(next);
    },

    getSpecOrder: (req, res, next) => {
        const orderId = req.params.id;
        Order.findOne({ _id: orderId }).populate('user').populate('orderedItems')
            .then((order) => res.send(order))
            .catch(next);
    },

    getUserOrders: (req, res, next) => {
        const userId = req.params.id;
        Order.find({ user: userId }).populate('orderedItems')
            .then((orders) => res.send(orders))
            .catch(next);
    },

    // post: (req, res, next) => {
    //     const { products, price, payment } = req.body;
    //     const { _id } = req.user;

    //     Order.create({ status: 'New Order', user: _id, products, price, payment })
    //         .then((createdOrder) => {
    //             return Promise.all([
    //                 User.updateOne({ _id }, { $push: { order: createdOrder } }),
    //                 User.updateOne({ _id }, { $set: { cart: [] } }),
    //             ]);
    //         })
    //         .then(([modifiedObj, orderObj]) => {
    //             res.send(orderObj);
    //         })
    //         .catch(next);
    // },

    post: (req, res, next) => {
        const { orderedItems, price, payment } = req.body;
        const { _id } = req.user;

        Order.create({ status: 'New Order', user: _id, orderedItems, price, payment })
            .then((createdOrder) => {
                return Promise.all([
                    User.updateOne({ _id }, { $push: { order: createdOrder } }),
                    User.updateOne({ _id }, { $set: { cartIt: [] } }),
                ]);
            })
            .then(([modifiedObj, orderObj]) => {
                res.send(orderObj);
            })
            .catch(next);
    },

    editStatus: (req, res, next) => {
        const id = req.params.id;
        const { status } = req.body;
        Order.updateOne({ _id: id }, { status: status })
            .then((updatedOrder) => res.send(updatedOrder))
            .catch(next);
    }
}