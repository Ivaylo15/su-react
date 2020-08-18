const models = require('../models');
const config = require('../config/config');
const utils = require('../utils');
const user = require('../routes/user');
const book = require('../routes/book');
const suggestedBook = require('../routes/suggestedBook');
const comment = require('../routes/comment');
const order = require('../routes/order');
const orderItem = require('../routes/orderItem');

module.exports = (app) => {

    app.use('/api/user', user);

    app.get('/api/auth', (req, res) => {
        const token = req.cookies[config.authCookieName];
        utils.jwt.verifyToken(token)
            .then(({id}) => models.User.findById(id))
            .then(user => res.send(user))
            .catch(() => res.status(401).send('HELLO!'))
    })

    app.use('/api/book', book);

    app.use('/api/suggestedBook', suggestedBook);

    app.use('/api/order', order);

    app.use('/api/orderItem', orderItem);

    app.use('/api/comment', comment);

    app.use('*', (req, res, next) => res.send('<h1> Something went wrong. Try again. :thumbsup: </h1>'))
};