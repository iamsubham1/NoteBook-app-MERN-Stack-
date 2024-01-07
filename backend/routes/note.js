
const express = require('express');
const router = express.Router()
const verifyUser = require('../middleware/verifyUser')
//import the noteschema
const Note = require('../models/NoteSchema');
const User = require('../models/UserSchema');
//import express validator
const { body, validationResult } = require('express-validator');



//fetch all notes after login
router.get('/fetch', verifyUser, async (req, res) => {
    const notes = await Note.find({ user: req.user.id })
    res.json(notes)

})

router.options('/addnotes', (req, res) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.status(200).end();
});

//add notes
router.post('/addnotes', verifyUser, [
    body('title', 'cant be empty').exists(),
    body('description', 'cant be empty').isLength({ min: 1 }),
], async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');

    const { title, description, tag } = req.body;
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map(error => {
                return { msg: `${error.msg}` };
            });
            return res.status(400).json({ error: errorMessages });
        }
        let findtitle = await Note.findOne({ title: req.body.title, user: req.user.id })
        if (!findtitle) {
            console.log("!found")

            const note = new Note({
                title, description, tag, user: req.user.id

            })
            const savednote = await note.save()

            const updatedUser = await User.findOneAndUpdate(
                { _id: req.user.id },
                { $push: { notes: savednote } },
                { new: true }
            );
            res.json(savednote);
        }
        else {
            res.status(409).send("error:note with same title exists")
        }
    }
    catch (error) {
        res.status(500).send("internal server error")
    }
});

//update existing notes(login required)
router.put('/updatenote/:id', verifyUser, [], async (req, res) => {

    try {
        const { title, description, tag } = req.body
        //create new note objects
        const newNote = {}
        if (title) { newNote.title = title }
        if (description) { newNote.description = description }
        if (tag) { newNote.tag = tag }


        //find the note you want to update 
        let note = await Note.findById(req.params.id)
        if (!note) {
            return res.status(404).send('No such note')
        }
        //check if the user is allowed to access the note by checking the user id in notes and the id that's coming in req
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send('access denied')
        }

        //update
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note })
    }
    catch (error) {
        res.status(500).send("internal server error")
    }
});

//delete a note 
router.delete('/deletenote/:id', verifyUser, [], async (req, res) => {

    try {
        //find the note you want to delete and delete it
        let note = await Note.findById(req.params.id)
        if (!note) {
            return res.status(404).send('No such note found')
        }

        //Allow only if accessed by the actual user
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send('access denied')
        }
        note = await Note.findByIdAndDelete(req.params.id)
        res.send("note deleted")
    }
    catch (error) {
        res.status(500).send("internal server error")
    }

});

module.exports = router