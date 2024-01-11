const { createLogger, transports, format } = require('winston');
const Log = require('../models/LogSchema');

const logger = createLogger({
    format: format.combine(
        format.timestamp(),
        format.json()
    ),

});

const logs = [];

const activityLogger = (req, res, next) => {
    const { body, params } = req;
    const userId = req.user.id ? req.user.id : 'unauthenticated';

    let actionMessage = '';

    switch (req.route.path) {
        case '/addnotes':
            actionMessage = `added a new note with title: ${body.title}`;
            break;
        case '/updatenote/:id':
            actionMessage = `updated a note with title: ${body.title}`;
            break;
        case '/deletenote/:id':
            actionMessage = `deleted a note with title: ${params.title}`;
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
        userId,
        timestamp: new Date(),
        actionMessage,
    };

    // Log the entry with Winston 
    logger.info(logEntry);
    const log = new Log(logEntry);

    //save to database
    log.save()
        .then(savedLog => {
            console.log('Log saved to database:', savedLog);
        })
        .catch(error => {
            console.error('Error logging to database:', error);
        });

    next();
};

const getLogs = (userId) => {
    return Log.find({ userId }).exec();
};

module.exports = {
    activityLogger,
    getLogs
};
