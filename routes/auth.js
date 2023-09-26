const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

router.post('/login', async (req, res) => {
    let user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).json({ msg: 'Email or password incorrect' });
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword ) return res.status(400).json({ msg: 'Email or password incorrect' });

    const token = jwt.sign({_id: user._id, host: user.userType.host}, process.env.JWT_PRIVATE_KEY, {expiresIn: "7d"});
    

    //console.log(token);
    res.json({user: token});

})



module.exports = router;