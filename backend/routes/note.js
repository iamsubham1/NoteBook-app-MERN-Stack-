

const express = require('express');
const router = express.Router()
const Notes = require('../models/NoteSchema');
const { body, validationResult } = require('express-validator');


router.post('/addnote', [body('title', 'title is required').exists(),
body('description', 'title is required').exists(),
body('tag', 'title is required').exists()],
    async (req, res) => {
        const errors = validationResult(req)
        try {
            if (!errors.isEmpty) {
                const errorMessages = await errors.array().map(error => {
                    return { msg: `${error.msg}` }
                })
                return res.status(400).json({ error: errorMessages })
            }

            let title = await Notes.findOne({ title: req.body.title })
            if (title) {
                return res.status(400).json({ msg: "title exists" })
            }
            notes = await Notes.create({
                title: req.body.title,
                description: req.body.description,
                tag: req.body.tag,

            })
            return res.json({ msg: "user created", title: Notes.title })

        } catch (error) {
            console.error(error)
            res.status(500)

        }
    })

router.get('/del', (req, res) => {
    obj = {
        name: 'notes deleted',
    }
    res.json(obj)
})


module.exports = router