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
    body('name', 'Enter a valid name').isLength({ min: 3 }),
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
                dob: req.body.dob,
            })

            const data = {
                userId: user._id,
            }
            const authToken = jwt.sign(data, signature);
            return res.json({ msg: "user created", Authtoken: authToken })

        } catch (error) {
            console.error(error.message)
            return res.status(500).send('internal Server error ')
        }
    })

//login route 
router.post('/login',
    [body('email', 'Enter a valid email').isEmail(),
    body('password', 'password cant be empty').exists(),],
    async (req, res) => {
        let success = false;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {

            return res.status(400).send(error);
        }
        const { email, password } = req.body
        try {
            let user = await User.findOne({ email: email });
            if (!user) {
                return res.status(400).json({ error: "enter correct credentials" });
            }
            const passwordCompare = await bcrypt.compare(password, user.password);
            if (!passwordCompare) {
                return res.status(400).json({ error: "enter correct credentials" });
            }

            const data = {
                user: {
                    id: user.id
                }
            }
            const authtoken = jwt.sign(data, signature);
            success = true;
            res.json({ success, authtoken })

        }
        catch (error) {
            console.error(error.message)
            return res.status(500).send('internal server error')

        }

    })

//Getting loggedin User details
router.post("/getuser", fetchuser, async (req, res) => {
    try {
        userId = req.user.id;
        // console.log({ userId });

        // Assuming User is a Mongoose model
        const user = await User.findById(userId).select("-password");

        // Sending the response
        res.send(user);

    } catch (error) {
        // Handling errors and sending a 500 response in case of an error
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});


//Export the router for the routes to work as it uses express router
module.exports = router