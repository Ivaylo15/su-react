const OrderItem = require("../models/OrderItem");
const User = require("../models/User");

module.exports = {
    getAll: (req, res, next) => {
        OrderItem.find()
            .then((item) => res.send(item))
            .catch(next);
    },

    getUserOrder: (req, res, next) => {
        const userId = req.params.id;
        OrderItem.find({ user: userId })
            .then((item) => res.send(item))
            .catch(next);
    },

    post: (req, res, next) => {
        const { user, product, price, amount } = req.body;

        OrderItem.create({ user, product, price, amount })
            .then((createdOrderItem) => {
                return Promise.all([
                    User.updateOne({ _id: user }, { $push: { cartIt: createdOrderItem } }),
                ]);
            })
            .then(([modifiedObj, orderObj]) => {
                res.send(orderObj);
            })
            .catch(next);
    },

    changeAmount: (req, res, next) => {
        const id = req.params.id;
        const { amount, price } = req.body;
        OrderItem.updateOne({ _id: id }, { amount: amount, price: price })
            .then((updatedOrderItem) => res.send(updatedOrderItem))
            .catch(next);
    },

    delete: (req, res, next) => {
        const { id } = req.params;
        const { user } = req.body;
        OrderItem.deleteOne({ _id: id })
            .then((deletedOrderItem => {
                return Promise.all([
                    User.updateOne({ _id: user }, { $pull: { cartIt: id } })
                ])
            }))
            .then((removedComment) => {
                res.send(removedComment);
            })
            .catch(next);
    }

};