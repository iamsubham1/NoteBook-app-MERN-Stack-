const express = require('express');
const User = require('../models/UserSchema');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '.env' });



// get signature from .env
const signature = process.env.signature;


const fetchuser = require('../middleware/fetchuser')


//SignUp route(create an user) express validator gives the validation result //Route1
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 2 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'The password must include a digit and should be of atleast 8 digits').isLength({ min: 8 }).matches(/\d/)
],
    async (req, res) => {

        //checking for expressvalidation results
        try {
            const errors = validationResult(req);
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
                console.log("email id exists")
                return res.status(400).json({ msg: "email-id already exists" })
            }
            //create hashed password adding salt using bcryptjs and store in db
            const salt = await bcrypt.genSalt(10);
            const secpass = await bcrypt.hash(req.body.password, salt);

            //creating users using "UserSchema"
            user = await User.create({
                name: req.body.name,
                password: secpass,
                email: req.body.email,

            })

            const data = {
                userId: user._id,
            }

            //generate authtoken
            const authToken = jwt.sign(data, signature);
            res.cookie('authToken', authToken,
                { httpOnly: true });

            return res.json({ "authtoken": authToken });

        } catch (error) {
            console.error(error.message)
            return res.status(500).send('internal Server error ')
        }
    })

//login route 
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be empty').exists(),
], async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            console.log('Validation errors:', errors.array());
            return res.status(400).json({ success: false, errors: errors.array() });
        }

        const { email, password } = req.body;

        let user = await User.findOne({ email });

        if (!user) {
            console.log('User not found for email:', email);
            return res.status(400).json({ success: false, error: "Enter correct credentials" });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);

        if (!passwordCompare) {
            console.log('Incorrect password for user:', email);
            return res.status(400).json({ success: false, error: "Enter correct credentials" });
        }

        const data = {
            user: {
                id: user.id
            }
        }

        // Generate auth token
        const token = jwt.sign(data, signature);
        res.status(200).cookie('JWT', token, {
            httpOnly: false,
            maxAge: 120 * 60 * 10000,
            secure: true,
            sameSite: 'None',
            path: '/'
        }).json({ success: true, token });

    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ success: false, error: 'Internal server error' });
    }
});

//Getting loggedin User details
router.post("/getuser", fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;



        const user = await User.findById(userId).select("-password");

        // Sending the response
        res.status(200).json({ "msg": "user valid", user })

    } catch (error) {
        // Handling errors and sending a 500 response in case of an error
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});


//Export the router for the routes to work as it uses express router
module.exports = router






