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
    dob: {
        type: Date,
        required: true,
    },
});

//creating a model named User using the userschema
const User = mongoose.model('createUser', userSchema);
User.createIndexes();
module.exports = User;