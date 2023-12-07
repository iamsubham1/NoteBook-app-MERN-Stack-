const mongoose = require('mongoose');

const NotesSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true,

    },
    tag: {
        type: String,
        required: true,

    },
    date: {
        type: date,
        default: Date.now

    },
});

module.exports = mongoose.model('notes', NotesSchema);