const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Car = require('../models/car');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
let path = require('path');
const { isObjectIdOrHexString } = require('mongoose');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/uploads');
    },
    filename: function(req, file, cb) {   
        cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if(allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

let upload = multer({ storage, fileFilter });


router.route('/add-car').post(upload.fields([{
        name: 'profilePhoto', maxCount: 1
    }, {
        name: 'license', maxCount: 1
    },
    {
        name: 'carPhoto', maxCount: 1
    }]), 
    async (req, res) => {
    console.log(req.body.condition);
    let car = new Car({
        owner: req.body.owner,
        location: req.body.location,
        profilePhoto: req.files['profilePhoto'],
        ownerLicense: req.files['license'],
        mobile: req.body.mobile,
        carPhoto: req.files['carPhoto'],
        vin: req.body.vin,
        make: req.body.make,
        model: req.body.model,
        year: req.body.year,
        mileage: req.body.mileage,
        transmission: req.body.transmission,
        condition: req.body.condition,
        price: req.body.price
    });

    const isCarAdded = await car.save().then(() => {
        return true;
    }).catch(err => {
        console.log(err);
        return false;
    });
    
    //console.log("********************"+isCarAdded);

        const user = await User.findByIdAndUpdate(req.body.owner, {userType:{ host: true}},  
        function (err, docs) {
        if (err) console.log(err)
        else console.log("Updated User : ", docs);
        });
    
        const token = jwt.sign({_id: req.body.owner, host: user.userType.host}, process.env.JWT_PRIVATE_KEY, {expiresIn: "7d"});

    // console.log(token);
    res.json({user: token, carAdded: isCarAdded});


});

module.exports = router;
