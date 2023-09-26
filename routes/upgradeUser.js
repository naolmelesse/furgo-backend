const express = require('express');
const router = express.Router();
const User = require('../models/user');
const ObjectId = require("mongodb").ObjectId;



router.post('/upgradeUser/:id', async (req, res) => {
        //console.log(req.body);
        let myquery = { _id: req.body._id };

        let newValue = {
            $set: {
                access:{
                    free: true,
                    premium: true
                }
            }
        };
        await User.updateOne(myquery, newValue, (err, res) => {
            if (err) throw err;
            //console.log("User upgraded!");
            //window.alert("User upgraded to premium.")
            
        })
        res.send("User upgraded to premium.");
        //console.log(users);
    

});

module.exports = router;