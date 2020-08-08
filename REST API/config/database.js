const mongoose = require('mongoose');
const config = require('./config');
const User = require('../models/User');

module.exports = () => {
    return mongoose.connect(config.dbURL, { useNewUrlParser: true, useUnifiedTopology: true });
    
};