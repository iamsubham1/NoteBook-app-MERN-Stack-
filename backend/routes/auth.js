const express = require('express');
const User = require('../models/UserSchema');
const { body, validationResult } = require('express-validator');
const router = express.Router();

//create an user : POST "api/auth/createuser" this doesnt require authentication for now (express validator gives the validation result)
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'The password must include a digit and should be of atleast 8 digits').isLength({ min: 8 }).matches(/\d/)
],
    async (req, res) => {
        const errors = validationResult(req);
        //checking for expressvalidation results
        try {
            if (!errors.isEmpty()) {
                const errorMessages = errors.array().map(error => {
                    return { msg: `${error.msg}` };
                });
                return res.status(400).json({ error: errorMessages });
            }
            //error for existing email//check for custom validations
            let user = await User.findOne({ email: req.body.email });
            // console.log(user)

            if (user) {
                return res.status(400).json({ msg: "email-id already exists" })
            }
            //creating users using "UserSchema"
            user = await User.create({
                name: req.body.name,
                password: req.body.password,
                email: req.body.email,
                dob: req.body.dob,
            })
            return res.json({ msg: "user created", user })
        } catch (error) {
            console.error(error.message)
            return res.status(500).send('Server error ,check try block')
        }
    })

//Export the router for the routes to work as it uses express router
module.exports = router