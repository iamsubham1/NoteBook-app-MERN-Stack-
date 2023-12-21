const connectToMongo = require('./db');
const express = require('express');
const app = express();
const port = 6000;


const startServer = async () => {
    try {

        // Using middleware to deal with req.body to send JSON
        app.use(express.json());

        // Routes
        app.use('/api/auth', require('./routes/auth'));
        app.use('/api/notes', require('./routes/note'));

        // Listening
        app.listen(port, () => {
            console.log(`NoteBook-app is running on ${port}`);
        });
    } catch (error) {
        console.error('Error starting the server:', error);
        process.exit(1);
    }
};

const initializeApp = async () => {
    await connectToMongo();
    await startServer();
}
// Invoke the initialization function
initializeApp();
