const express = require('express');
const router = express.Router();
const Car = require('../models/car');



router.get('/getCars', async (req, res) => {

        let cars = await Car.find({available: true});
        //console.log(cars);
        res.json(cars);
        
    

});

module.exports = router;