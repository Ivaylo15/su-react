const User = require('../models/User');
const SuggestedBook = require('../models/SuggestedBook');

module.exports = {
    get: (req, res, next) => {
        SuggestedBook.find()
            .then((books) => res.send(books))
            .catch(next);
    },

    post: (req, res, next) => {
        const { title, author, link } = req.body;
        const { _id } = req.user;

        SuggestedBook.create({ title, author, link, creater: _id })
            // .then((createdBook) => {
            //     res.send(createdBook);
            // })
            // .catch(next);
            .then((createdBook) => {
                return Promise.all([
                    User.updateOne({ _id }, { $push: { suggestedBooks: createdBook } }),
                    SuggestedBook.findOne({ _id: createdBook._id })
                ]);
            })
            .then(([modifiedObj, bookObj]) => {
                res.send(bookObj);
            })
            .catch(next);
    },

    delete: (req, res, next) => {
        const id = req.params.id;
        SuggestedBook.deleteOne({ _id: id })
            .then((removedBook) => res.send(removedBook))
            .catch(next);
    }
}