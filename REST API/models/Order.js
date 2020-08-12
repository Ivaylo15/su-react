const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Model = mongoose.model;
const { String, ObjectId } = Schema.Types;

const orderSchema = new Schema({
    
    status: {
        type: String
    },

    user: {
        type: ObjectId,
        ref: "User"
    },

    products: [{
        type: ObjectId,
        ref: "Book"
    }],

    price: {
        type: String,
        required: true
    },

    payment: {
        type: String,
        required: true
    }
});

module.exports = new Model('Order', orderSchema);
