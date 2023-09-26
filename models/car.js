const mongoose = require('mongoose');

const car = new mongoose.Schema({
    owner: {
        type: String
    },
    location: {
        type: String
    },
    profilePhoto: {
        type: Object
    },
    ownerLicense: {
        type: Object
    },
    mobile: {
        type: String,
        required: true
    },
    carPhoto: {
        type: Object
    },
    vin: {
        type: String
    },
    make: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    mileage: {
        type: String,
        required: true
    },
    transmission: {
        type: String
    },
    condition: {
        type: String
    },
    price: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    available: {
        type: Boolean,
        default: true
    }



});

module.exports = mongoose.model('cars', car);