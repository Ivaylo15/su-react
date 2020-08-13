const User = require('../models/User');
const Book = require('../models/Book');
const Comment = require('../models/Comment');
const user = require('./user');

module.exports = {
    get: (req, res, next) => {
        Comment.find()
            .then((comments) => res.send(comments))
            .catch(next);
    },

    getCommentsForSpecificBook: (req, res, next) => {
        const bookId = req.params.id;
        Comment.find({ book: bookId })
            .then((comments) => res.send(comments))
            .catch(next);
    },

    getCommentsForSpecificUser: (req, res, next) => {
        const userId = req.params.id;
        Comment.find({ author: userId })
            .then((comments) => res.send(comments))
            .catch(next);
    },

    post: (req, res, next) => {
        const { comment, book } = req.body;
        const { _id } = req.user;

        Comment.create({ comment: comment, book: book, author: _id })
            .then((createdComment) => {
                return Promise.all([
                    User.updateOne({ _id }, { $push: { comments: createdComment } }),
                    Book.updateOne({ _id: book }, { $push: { comments: createdComment } })
                ])
            })
            .then(([modifiedObj, commentObj]) => {
                res.send(commentObj)
            })
            .catch(next);
    },

    put: (req, res, next) => {
        const id = req.params.id;
        const { comment } = req.body;
        Comment.updateOne({ _id: id }, { comment })
            .then((updatedComment) = res.send(updatedComment))
            .catch(next);
    },

    delete: (req, res, next) => {
        const { id } = req.params;
        const { author } = req.body;
        Comment.deleteOne({ _id: id })
            .then((removedComment => {
                return Promise.all([
                    User.updateOne({ _id: author }, { $pull: { comments: id } })
                ])
            }))
            .then((removedComment) => {
                res.send(removedComment);
            })
            .catch(next);
    }
}

