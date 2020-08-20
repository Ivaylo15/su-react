const models = require('../models');
const config = require('../config/config');
const utils = require('../utils');
const { model } = require('mongoose');

module.exports = {
    get: (req, res, next) => {
        models.User.find().populate('favoriteBooks').populate('cartIt')
            .then((users) => res.send(users))
            .catch(next)
    },

    getSpecificUser: (req, res, next) => {
        const userId = req.params.id;
        models.User.findOne({ _id: userId }).populate('favoriteBooks').populate('cartIt')
            .then((users) => res.send(users))
            .catch(next)
    },

    post: {
        register: (req, res, next) => {
            const { username, firstname, city, addres, lastname, password } = req.body;
            models.User.create({ username, firstname, lastname, city, addres, password })
                .then((createdUser) => res.send(createdUser))
                .catch(next)
        },

        login: (req, res, next) => {
            const { username, password } = req.body;
            models.User.findOne({ username })
                .then((user) => Promise.all([user, user.matchPassword(password)]))
                .then(([user, match]) => {
                    if (!match) {
                        res.status(401).send('Invalid password');
                        return;
                    }

                    const token = utils.jwt.createToken({ id: user._id });
                    res.cookie(config.authCookieName, token).send(user);
                })
                .catch(next);
        },

        logout: (req, res, next) => {
            const token = req.cookies[config.authCookieName];
            console.log('-'.repeat(100));
            console.log(token);
            console.log('-'.repeat(100));
            models.TokenBlacklist.create({ token })
                .then(() => {
                    res.clearCookie(config.authCookieName).send('Logout successfully!');
                })
                .catch(next);
        }
    },

    // put: (req, res, next) => {
    //     const id = req.params.id;
    //     const book = req.body;
    //     models.User.update({ _id: id }, { $push: { favoriteBooks: book } })
    //         .then((updatedUser) => res.send(updatedUser))
    //         .catch(next)
    // },

    put: (req, res, next) => {
        const id = req.params.id;
        // const { _id } = req.body;
        const newFavoriteBooks = req.body;
        // models.User.updateOne({ _id: id }, { $push: { favoriteBooks: _id } })
        models.User.updateOne({ _id: id }, { favoriteBooks: newFavoriteBooks })
            .then((updatedUser) => res.send(updatedUser))
            .then(res => console.log(res))
            .catch(next);
    },

    editUserInfo: (req, res, next) => {
        const id = req.params.id;
        const { username, firstname, lastname, city, addres} = req.body;
        models.User.updateOne({ _id: id }, { username, firstname, lastname, city, addres })
            .then((updatedBook) => res.send(updatedBook))
            .catch(next);
    },

    putCart: (req, res, next) => {
        const id = req.params.id;
        const newCartBooks = req.body;
        models.User.updateOne({ _id: id }, { cartIt: newCartBooks })
            .then((updatedUser) => res.send(updatedUser))
            .then(res => console.log(res))
            .catch(next);
    },

    delete: (req, res, next) => {
        const id = req.params.id;
        models.User.deleteOne({ _id: id })
            .then((removedUser) => res.send(removedUser))
            .catch(next);
    }
};