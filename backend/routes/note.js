
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


module.exports = router