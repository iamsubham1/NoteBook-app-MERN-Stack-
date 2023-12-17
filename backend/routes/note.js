
const express = require('express');
const router = express.Router()
const fetchuser = require('../middleware/fetchuser')
//import the noteschema
const Note = require('../models/NoteSchema');
//import express validator
const { body, validationResult } = require('express-validator');



//fetch all notes after login
router.get('/fetch', fetchuser, async (req, res) => {
    const notes = await Note.find({ user: req.user.id })
    res.json(notes)

})
//add notes
router.post('/addnotes', fetchuser, [
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
    const note = new Note({
        title, description, tag, user: req.user.id

    })
    const savednote = await note.save()
    res.json(savednote)
});
//update existing notes(login required)
router.put('/updatenote/:id', fetchuser, [], async (req, res) => {

    const { title, description, tag } = req.body
    //create new note objects
    const newNote = {}
    if (title) { newNote.title = title }
    if (description) { newNote.description = description }
    if (tag) { newNote.tag = tag }


    //find the note you want to update and update it
    let note = await Note.findById(req.params.id)
    if (!note) {
        return res.status(404).send('No such note')
    }
    if (note.user.toString() !== req.user.id) {
        return res.status(401).send('access denied')
    }
    note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
    res.json({ note })
});
module.exports = router