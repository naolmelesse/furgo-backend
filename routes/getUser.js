const express = require('express');
const router = express.Router();
const User = require('../models/user');



router.get('/get-user/:id', async (req, res) => {
        let user = await User.find({_id: req.params.id});
        res.json(user);  

});

module.exports = router;