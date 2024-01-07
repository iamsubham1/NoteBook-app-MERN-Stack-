const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    notes: [{
        type: Schema.Types.ObjectId,
        ref: 'Note'
    }],
    profilePic: {
        type: String,
    }
});

// Creating a model named User using the user schema
const User = mongoose.model('User', userSchema);
User.createIndexes();
module.exports = User;
