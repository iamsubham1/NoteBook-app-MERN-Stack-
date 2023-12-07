const mongoose = require('mongoose');
const mongoURI = "mongodb://127.0.0.1:27017"; //IPV4

const connectToMongo = async () => {
    //this try block catches error at early stage
    try {
        await mongoose.connect(mongoURI);
        console.log("Connected to mongoDB successfully");
    } catch (error) {
        console.log(error);
        process.exit();
    }
};

module.exports = connectToMongo;
