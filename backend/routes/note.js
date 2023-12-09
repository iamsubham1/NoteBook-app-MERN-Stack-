
const express = require('express');
const router = express.Router()

//import the noteschema
const Notes = require('../models/NoteSchema');
//import express validator
const { body, validationResult } = require('express-validator');

//response on /addnote end point, validation check 
router.post('/addnote', [body('title', 'title is required').exists(),
body('description', 'title is required').exists(),
body('tag', 'title is required').exists()],
    async (req, res) => {
        const errors = validationResult(req)
        try {
            //validation results
            if (!errors.isEmpty) {
                const errorMessages = await errors.array().map(error => {
                    return { msg: `${error.msg}` }
                })
                return res.status(400).json({ error: errorMessages })
            }
            //check for same existing titles
            let title = await Notes.findOne({ title: req.body.title })
            if (title) {
                return res.status(400).json({ msg: "title exists" })
            }
            notes = await Notes.create({
                title: req.body.title,
                description: req.body.description,
                tag: req.body.tag,

            })
            return res.json({ msg: "notes created", title: Notes.title })

        } catch (error) {
            console.error(error)
            res.status(500).send('Server error ,check try block')

        }
    })

router.get('/del', (req, res) => {
    obj = {
        name: 'notes deleted',
    }
    res.json(obj)
})


module.exports = router