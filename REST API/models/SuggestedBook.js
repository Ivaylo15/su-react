const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Model = mongoose.model;
const { String, ObjectId } = Schema.Types;

const suggestedBookSchema = new Schema({
    
    title: {
        type: String,
        required: true
    },

    author: {
        type: String,
        required: true
    },

    link: {
        type: String,
        required: true
    },

    creater: {
        type: ObjectId,
        ref: "User"
    },
});

module.exports = new Model('SuggestedBook', suggestedBookSchema);