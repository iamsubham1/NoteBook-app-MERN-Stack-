const connectToMongo = require('./db')
//invoked the function
const express = require('express')
const app = express()
const port = 4000


const startServer = async () => {
    //using middleware to deal with req.body to send a json
    app.use(express.json())


    //routes
    app.use('/api/auth', require('./routes/auth'))
    app.use('/api/notes', require('./routes/note'))

    //listening
    app.listen(port, () => {
        console.log(`NoteBook-app is running on ${port}`)
    })

}
const initializeApp = async () => {
    await connectToMongo();
    await startServer();
};

// Invoke the initialization function
initializeApp();