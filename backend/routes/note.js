
const express = require('express');
const router = express.Router()
const verifyUser = require('../middleware/verifyUser')
//import the noteschema
const Note = require('../models/NoteSchema');
const User = require('../models/UserSchema');
//import express validator
const { body, validationResult } = require('express-validator');
const { activityLogger } = require('../middleware/activityLogger')


//fetch all notes 
router.get('/fetch', verifyUser, async (req, res) => {
    const notes = await Note.find({ user: req.user.id })
    res.json(notes)

})

//create note
router.post('/addnotes', verifyUser, activityLogger, [
    body('title', 'cant be empty').exists().toLowerCase(),
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
            // console.log("!found")

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

//update existing notes
router.put('/updatenote/:id', verifyUser, activityLogger, async (req, res) => {

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
router.delete('/deletenote/:id', verifyUser, activityLogger, async (req, res) => {
    try {
        // Find the note you want to delete and delete it
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send('No such note found');
        }

        // Allow only if accessed by the actual user
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send('Access denied');
        }

        // Delete the note
        await Note.findByIdAndDelete(req.params.id);


        // update the reference to the deleted note from the User's notes array
        await User.findByIdAndUpdate(req.user.id, { $pull: { notes: req.params.id } });

        res.send('Note deleted');
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal server error');
    }
});

//filter by tag
router.post('/filter', verifyUser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        const filterBy = req.body.tag;
        const filteredNotes = notes.filter(note => note.tag === filterBy);
        res.status(200).json({ success: true, notes: filteredNotes });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

//search by title
router.post('/search', verifyUser, async (req, res) => {
    try {
        const title = req.body.title;
        const notes = await Note.find({ user: req.user.id });
        const searchedNote = notes.filter((note) => note.title.includes(title));

        if (searchedNote) {
            res.status(200).json({ success: true, notes: searchedNote });
        } else {
            res.status(404).json({ success: false, message: 'Note not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});


module.exports = router