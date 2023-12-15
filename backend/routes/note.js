
const express = require('express');
const router = express.Router()
const fetchuser = require('../middleware/fetchuser')
//import the noteschema
const Notes = require('../models/NoteSchema');
//import express validator
const { body, validationResult } = require('express-validator');



//fetch all notes after login
router.get('/fetch', fetchuser, async (req, res) => {
    const notes = await Notes.find({ user: req.user.id })
    res.json(notes)

})
//add notes
router.post('/add', fetchuser, [
    body('title', 'cant be empty').exists(),
    body('description', 'cant be empty').isLength({ min: 5 }),
], async (req, res) => {
    const { title, description, tag } = req.body;
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map(error => {
                return { msg: `${error.msg}` };
            });
            return res.status(400).json({ error: errorMessages });
        }
    }
    catch (error) {
        res.send(error)
    }
    const notes = new Notes({

    })
});

module.exports = router