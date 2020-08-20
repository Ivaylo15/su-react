const User = require('../models/User');
const Book = require('../models/Book');
// require('../models/Comment')
// const Comment = require('../models/Comment');

module.exports = {
    get: (req, res, next) => {
        Book.find()
            .then((books) => res.send(books))
            .catch(next);
    },

    getSpecificBook: (req, res, next) => {
        const bookId = req.params.id;
        Book.findOne({ _id: bookId }).populate('comments')
            .then(book => res.send(book))
            .catch(next);
    },

    getFavoriteBooks: (req, res, next) => {
        const { favoriteBooks } = req.query.fav;
        Book.find()
            .then((books) => {
                books._id.includes(favoriteBooks)
            })
            .then((books) => res.send(books))
            .catch(next);
    },

    getBookByAuthor: (req, res, next) => {
        const curAuthor = req.params.id;
        Book.find({ author: curAuthor })
            .then((books) => res.send(books))
            .catch(next);
    },

    getBookByPublisher: (req, res, next) => {
        const publisher = req.params.id;
        Book.find({ publisher: publisher })
            .then((books) => res.send(books))
            .catch(next);
    },

    getBookByGenre: (req, res, next) => {
        const genre = req.params.id;
        Book.find({ genres: genre })
            .then((books) => res.send(books))
            .catch(next);
    },

    post: (req, res, next) => {
        const { title, author, image, price, publisher, description, genres } = req.body;
        const { _id } = req.user;

        Book.create({ title, author, image, price, publisher, description, creater: _id, genres })
            .then((createdBook) => {
                return Promise.all([
                    User.updateOne({ _id }, { $push: { books: createdBook } }),
                    Book.findOne({ _id: createdBook._id })
                ]);
            })
            .then(([modifiedObj, bookObj]) => {
                res.send(bookObj);
            })
            .catch(next);
    },


    editRaitings: (req, res, next) => {
        const id = req.params.id;
        const newRatings = req.body;
        Book.updateOne({ _id: id }, { raiting: newRatings })
            .then((updatedBook) => res.send(updatedBook))
            .catch(next);
    },

    editWholeBook: (req, res, next) => {
        const id = req.params.id;
        const { title, author, image, price, publisher, description, genres } = req.body;
        Book.updateOne({ _id: id }, { title, author, image, price, publisher, description, genres })
            .then((updatedBook) => res.send(updatedBook))
            .catch(next);
    },

    delete: (req, res, next) => {
        const id = req.params.id;
        Book.deleteOne({ _id: id })
            .then((removedBook) => res.send(removedBook))
            .catch(next);
    }
};