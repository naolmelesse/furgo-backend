const mongoose = require('mongoose');

const rent = mongoose.Schema({
    renter: {
        type: String
    },
    host: {
        type: String
    },
    car: {
        type: String
    },
    date: {
        from : {
            type: Date
        },
        to: {
            type: Date
        }
    },
    total_income: {
        type: Number
    }

});

module.exports = mongoose.model('rents', rent);