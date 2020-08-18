const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Model = mongoose.model;
const { String, Number, ObjectId } = Schema.Types;

const orderItemSchema = new Schema({
  
    user: {
        type: ObjectId,
        ref: "User"
    },

    product: {
        type: ObjectId,
        ref: "Book"
    },

    price: {
        type: String,
        required: true
    },

    amount: {
        type: Number,
        required: true
    }
});

module.exports = new Model('OrderItem', orderItemSchema);