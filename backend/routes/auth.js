const express = require('express');
const User = require('../models/UserSchema');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const verifyUser = require('../middleware/verifyUser')
const Note = require('../models/NoteSchema');
const multer = require('multer')
const upload = multer({ dest: 'uploads' });
const cloudinary = require('cloudinary').v2;
const fs = require("fs");
const { Readable } = require('stream');
const sharp = require('sharp');

require('dotenv').config({ path: '.env' });
const signature = process.env.signature;

cloudinary.config({
    cloud_name: 'dmb0ooxo5',
    api_key: '961269617798218',
    api_secret: 'Xce-92wwLFRdAonPK59BCWcAooU'
});

// get signature from .env


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
router.post("/getuser", verifyUser, async (req, res) => {
    try {
        const userId = req.user.id;
        let user = await User.findById(userId).select("-password");

        // Explicitly fetch user's notes to get the updated count
        const notes = await Note.find({ user: userId });

        // Update the user object with the correct notes count
        user = { ...user.toObject(), notesCount: notes.length };

        // Sending the response
        res.status(200).json({ msg: "user valid", user });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

//Upload profile pic
router.post('/upload', verifyUser, (req, res) => {
    try {
        // console.log(req)
        upload.single('photo')(req, res, async (err) => {
            if (err) {
                if (err instanceof multer.MulterError) {
                    // Handle Multer-specific errors
                    if (err.code === 'LIMIT_FILE_SIZE') {
                        return res.status(400).json({ message: 'File size exceeds the limit' });
                    }
                    // Handle other Multer errors as needed
                    return res.status(500).json({ message: 'Multer error: ' + err.message });
                } else {
                    // Handle non-Multer errors
                    return res.status(500).json({ message: 'Internal server error: ' + err.message });
                }
            }

            // Continue with your route logic if file upload is successful
            const userId = req.user.id;
            const user = await User.findById(userId);

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const email = user.email;
            const inputUrl = req.file.path;
            console.log(inputUrl, email);

            // Process the image using sharp
            const transformedImageBuffer = await sharp(inputUrl)
                .resize(300, 300)
                .toFormat('jpeg')
                .rotate(0)
                .toBuffer();

            // Upload to Cloudinary
            const uploadStream = cloudinary.uploader.upload_stream({ resource_type: 'image' }, async (error, result) => {
                // Delete temporary file
                try {
                    await fs.promises.unlink(inputUrl);
                    console.log('Temporary file deleted successfully');
                } catch (err) {
                    console.error(`Error deleting file: ${err}`);
                }

                if (error) {
                    console.error(`Error uploading to Cloudinary: ${error}`);
                    return res.status(500).json({ message: 'Error uploading photo' });
                }

                // Update user's profile picture URL in the userSchema
                await User.findOneAndUpdate(
                    { email },
                    { profilePic: result.secure_url }
                );

                // Respond with success
                res.status(201).json({ message: 'Photo uploaded successfully' });
            });

            const transformedImageStream = new Readable();
            transformedImageStream.push(transformedImageBuffer);
            transformedImageStream.push(null);
            transformedImageStream.pipe(uploadStream);
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error handling photo upload' });
    }
});


//Export the router for the routes to work as it uses express router
module.exports = router






