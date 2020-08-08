const config = require('./config/config');
const dbConnection = require('./config/database');
const User = require('./models/User');


const app = require('express')();

dbConnection().then(() => {

    User.seedAdminUser()
    .then(() => {
        console.log('Database is rdy!')
    }).catch((reason) => {
        console.log('Somthing went wrong');
        console.log(reason)
    })

    require('./config/express')(app);

    require('./config/routes')(app);

    app.use(function (err, req, res, next) {
        console.error(err);
        res.status(500).send(err.message);
        console.log('*'.repeat(90))
    });

    app.listen(config.port, console.log(`Listening on port ${config.port}!`))

}).catch(console.error);