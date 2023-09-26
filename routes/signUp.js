const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');

dotenv.config();

router.post('/signup', async (req, res) => {


    let user = await User.findOne({email: req.body.email});
    if(user) return console.log("User already regisered.");
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    user = new User({
        fullName: req.body.fullName,
        email: req.body.email,
        password: hashedPass
    })
    
        await user.save()
        

    
})

module.exports = router;