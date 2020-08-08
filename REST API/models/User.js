const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const Schema = mongoose.Schema;
const Model = mongoose.model;
const { String, Number, Boolean, ObjectId } = Schema.Types;

const userSchema = new Schema({

    role: {
        type: String,
        default: 'user'
    },

    username: {
        type: String,
        unique: true,
        required: true
    },

    firstname: {
        type: String,
        required: true
    },

    lastname: {
        type: String,
        required: true
    }
    ,

    password: {
        type: String,
        require: true
    },

    // posts: [{
    //     type: ObjectId,
    //     ref: "Origami"
    // }],

    books: [{
        type: ObjectId,
        ref: "Book"
    }],

    // favoriteBooks: [{
    //     type: Object,
    // }],

    favoriteBooks: [{
        type: ObjectId,
        ref: "Book"
    }],

    suggestedBooks: [{
        type: ObjectId,
        ref: "SuggestedBook"
    }],

    comments: [{
        type: ObjectId,
        ref: "Comment"
    }]

});


userSchema.methods = {

    matchPassword: function (password) {
        return bcrypt.compare(password, this.password);
    }

};

userSchema.pre('save', function (next) {
    if (this.isModified('password')) {
        bcrypt.genSalt(saltRounds, (err, salt) => {
            bcrypt.hash(this.password, salt, (err, hash) => {
                if (err) { next(err); return }
                this.password = hash;
                next();
            });
        });
        return;
    }
    next();
});

const User = Model('User', userSchema);

User.seedAdminUser = async () => {
    try {
        let users = await User.find();
        // if(users.length > 0) return;
        // users.forEach(user => {
        //     if(user.role === 'admin'){
        //         return;
        //     }
        // })
        if(users.length > 0) return;
        // const salt = bcrypt.genSalt(saltRounds);
        // const hashedPassword = bcrypt.hash('admin', salt);
        return User.create({
            role: 'admin',
            username: 'admin@abv.bg',
            firstname: 'Jo',
            lastname: 'Black',
            password: '111111'
        })
    } catch (e) {
        console.log(e)
    }
}

module.exports = new Model('User', userSchema);