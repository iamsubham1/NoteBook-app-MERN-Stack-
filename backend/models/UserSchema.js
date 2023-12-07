const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
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

//creating a model named createuser using the userschema
module.exports = mongoose.model('createUser', UserSchema);