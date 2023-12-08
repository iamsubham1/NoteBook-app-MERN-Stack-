const mongoose = require('mongoose');

// MongoDB connection URI
const mongoURI = "mongodb://127.0.0.1:27017/notebook"; // IPV4

// Function to connect to MongoDB
const connectToMongo = async () => {
    // Try block to catch errors during the database connection attempt
    try {
        // Use Mongoose to connect to the MongoDB database using the provided URI
        await mongoose.connect(mongoURI);

        // Log a success message to the console if the connection is successful
        console.log("Connected to MongoDB successfully");
    } catch (error) {
        // Log any errors that occur during the connection attempt
        console.log(error);

        // Exit the Node.js process if an error occurs during database connection
        process.exit();
    }
};

// Export the connectToMongo function for use in other parts of the application
module.exports = connectToMongo;
