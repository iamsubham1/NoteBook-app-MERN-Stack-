const express = require('express');
const User = require('../models/UserSchema');
const { body, validationResult } = require('express-validator');
const router = express.Router();

//create an user : POST "api/auth/create" this doesnt require authentication for now
router.post('/a', [
    body('name').isLength({ min: 3 }),
    body('email', 'Enter a valid name').isEmail(),
    body('password', 'The password must include a digit and should be of atleast 8 digits').isLength({ min: 8 }).matches(/\d/)
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    User.create({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
        dob: req.body.dob,
    }).then(user => res.json(user));



})

//Export the router for the routes to work as it uses express router
module.exports = router