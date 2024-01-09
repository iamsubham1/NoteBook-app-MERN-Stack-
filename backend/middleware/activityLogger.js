const { createLogger, transports, format } = require('winston');
const Log = require('../models/ActivityLog');

const logger = createLogger({
    format: format.combine(
        format.timestamp(),
        format.json()
    ),

});

const activityLogger = async (req, res, next) => {
    const { body, params } = req;
    const userId = req.user ? req.user.id : 'unauthenticated';

    let actionMessage = '';

    switch (req.route.path) {
        case '/addnotes':
            actionMessage = `User added a new note with title: ${body.title}`;
            break;
        case '/updatenote/:id':
            actionMessage = `User updated a note with title: ${body.title}`;
            break;
        case '/deletenote/:id':
            actionMessage = `User deleted a note with title: ${params.id}`;
            break;
        case '/upload':
            actionMessage = 'uploaded profile pic';
            break;
        case '/createuser':
            actionMessage = 'Account created';
            break;
        default:
            actionMessage = 'Unknown action';
    }

    const logEntry = {
        timestamp: new Date(),
        user: userId,
        actionMessage,
    };

    // Log the entry with Winston
    logger.info(logEntry);

    // Log the entry to the database
    try {
        await Log.create(logEntry);
    } catch (error) {
        console.error('Error logging to database:', error);
    }

    next();
}

const getLogs = async (userId) => {
    try {
        const userLogs = await Log.find({ user: userId }).exec();
        return userLogs;
    } catch (error) {
        console.error('Error fetching logs from database:', error);
        throw error;
    }
}

module.exports = {
    activityLogger,
    getLogs
};
