const mongoose =require('mongoose');
const Schema = mongoose.Schema;
const Model = mongoose.model;
const { String, ObjectId } = Schema.Types;

const commentSchema = new Schema({

    comment: {
        type: String,
        required: true,
    },

    book: {
        type: ObjectId,
        ref: "Book",
        required: true
    },

    author: {
        type: ObjectId,
        ref: "User"
    }

});

module.exports = new Model('Comment', commentSchema);