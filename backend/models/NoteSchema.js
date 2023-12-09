const mongoose = require('mongoose');
const { Schema } = mongoose;
const NoteSchema = new Schema({
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
        type: String,
        default: Date.now

    },
});

const Notes = mongoose.model('Notes', NoteSchema);
module.exports = Notes;