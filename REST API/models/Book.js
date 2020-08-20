const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Model = mongoose.model;
const { String, Number, ObjectId } = Schema.Types;

const bookSchema = new Schema({
    
    title: {
        type: String,
        required: true
    },

    author: {
        type: String,
        required: true
    },

    image: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    publisher: {
        type: String,
        required: true
    },

    description: {
        type: String
    },

    creater: {
        type: ObjectId,
        ref: "User"
    },

    comments: [{
        type: ObjectId,
        ref: "Comment"
    }],

    genres: [{
        type: String,
    }],

    raiting: [{
        type: Object,
    }]
});

module.exports = new Model('Book', bookSchema);