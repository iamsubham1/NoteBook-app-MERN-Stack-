const express = require('express');
const router = express.Router();
const User = require('../models/UserSchema');


//create an user : POST "api/auth/create" this doesnt require authentication for now
router.get('/a', (req, res) => {
    const user = User(req.body)
    user.save()
    res.send(req.body);
    console.log(req.body);


})

//Export the router for the routes to work as it uses express router
module.exports = router