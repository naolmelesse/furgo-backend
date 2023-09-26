const mongoose = require('mongoose');

const user = new mongoose.Schema({
    fullName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    userType:{
        renter:{
            type: Boolean,
            default: true
        },
        host:{
            type: Boolean,
            default: false
        }
    },
    verified:{
        type: Boolean,
        default: false
    },
    rating: {
        type: String
    },
    date:{
        type: Date,
        default: Date.now
    },
    isAdmin:{
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('users', user);
