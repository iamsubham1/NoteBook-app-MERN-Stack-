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
    notes: {
        type: Array
    },
    profilePic: {
        type: String,
    }
});

//creating a model named User using the userschema
const User = mongoose.model('User', userSchema);
User.createIndexes();
module.exports = User;