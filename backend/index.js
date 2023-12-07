const connectToMongo = require('./db')
//invoked the function
connectToMongo();

const express = require('express')
const app = express()
const port = 4000

//using middleware
app.use(express.json())


//routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/note'))

//listening
app.listen(port, () => {
    console.log(`NoteBook-app is running on ${port}`)
})