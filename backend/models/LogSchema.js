

const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    timestamp:
    {
        type: Date,
        default: Date.now
    },
    actionMessage:
    {
        type: String,
        required: true
    }
});

const Log = mongoose.model('Log', logSchema);

module.exports = Log;
