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
const twilio = require('twilio');
const { getPublicID } = require('../utils/getPublicID');
const { activityLogger, getLogs } = require('../middleware/activityLogger')

require('dotenv').config({ path: '.env' });
//cloudinary
const signature = process.env.signature;
const cloud_name = process.env.cloud_name
const api_key = process.env.api_key
const api_secret = process.env.api_secret
//twilio
const accountSid = process.env.accountSid;
const authToken = process.env.authToken;
const myPhNumber = process.env.MyNumber
const twilioPhoneNumber = process.env.twilioPhoneNumber


//cloudinary config
cloudinary.config({
    cloud_name: cloud_name,
    api_key: api_key,
    api_secret: api_secret
});

//twilio config
const client = twilio(accountSid, authToken);


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
router.post('/upload', verifyUser, activityLogger, async (req, res) => {
    try {
        upload.single('photo')(req, res, async (err) => {
            if (err) {
                // Handle multer errors
                if (err instanceof multer.MulterError) {
                    if (err.code === 'LIMIT_FILE_SIZE') {
                        return res.status(400).json({ message: 'File size exceeds the limit' });
                    }
                    return res.status(500).json({ message: 'Multer error: ' + err.message });
                } else {
                    return res.status(500).json({ message: 'Internal server error: ' + err.message });
                }
            }

            const userId = req.user.id;
            const user = await User.findById(userId);

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const email = user.email;
            const inputPath = req.file.path;  // Use req.file.path to get the file path

            // Delete existing profile pic before uploading new one to save memory
            if (user.profilePic) {
                const cloudinaryUrl = user.profilePic;

                const publicId = await getPublicID(cloudinaryUrl);

                console.log('Extracted Public ID:', publicId);
                if (publicId) {
                    try {
                        const deletionResult = await cloudinary.uploader.destroy(publicId);
                        console.log('Existing photo deleted from Cloudinary successfully:', deletionResult);
                    } catch (deleteError) {
                        console.error(`Error deleting existing photo from Cloudinary: ${deleteError}`);
                        // Handle the error as needed
                    }
                }
            }

            // Process the image using sharp
            const transformedImageBuffer = await sharp(inputPath)
                .resize(300, 300)
                .toFormat('jpeg')
                .rotate(0)
                .toBuffer();

            // Upload to Cloudinary
            const uploadStream = cloudinary.uploader.upload_stream({ resource_type: 'image' }, async (uploadError, result) => {
                if (uploadError) {
                    console.error(`Error uploading to Cloudinary: ${uploadError}`);
                    return res.status(500).json({ message: 'Error uploading photo' });
                }

                // Update user's profile picture URL in the userSchema
                await User.findOneAndUpdate(
                    { email },
                    { profilePic: result.secure_url }
                );

                // Respond with success
                res.status(201).json({ message: 'Photo uploaded successfully' });

                // Delete temporary file after a successful upload
                try {
                    console.log('Deleting temporary file:', inputPath);
                    fs.unlink(inputPath, (unlinkError) => {
                        if (unlinkError) {
                            console.error(`Error deleting file: ${unlinkError}`);
                        } else {
                            console.log('Temporary file deleted successfully');
                        }
                    });
                } catch (unlinkError) {
                    console.error(`Error deleting file: ${unlinkError}`);
                }
            });

            // Pipe the transformedImageBuffer directly to the uploadStream
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


//send contact info as SMS
router.post('/sendsms', async (req, res) => {

    const { email, message } = req.body;

    // Concatenate email and message into a single string
    const smsBody = `Email: ${email}\nMessage: ${message}`;
    try {
        const sendMessage = await client.messages.create({
            body: smsBody,
            from: twilioPhoneNumber,
            to: myPhNumber
        });
        console.log(`SMS sent with SID: ${sendMessage.sid}`);
        res.send(`SMS sent with SID: ${sendMessage.sid}`);
    } catch (error) {
        console.error('Error sending SMS:', error.message);
        res.status(500).send(`Error sending SMS: ${error.message}`);
    }
})

//activity log
router.get('/fetchlogs', verifyUser, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId);
        const name = user.name
        console.log(name)
        const logs = await getLogs(userId);
        res.send(logs);
        console.log(logs)
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});


//Export the router for the routes to work as it uses express router
module.exports = router






