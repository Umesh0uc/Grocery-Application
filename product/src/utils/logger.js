const fs = require('fs');
const path = require('path');

const logDirectory = path.join(__dirname, '../../logs');
if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory);
}

function logToFile(message) {
    const logMessage = `[${new Date().toISOString()}] ${message}\n`;
    fs.appendFile(path.join(logDirectory, 'app.log'), logMessage, err => {
        if (err) console.error('Failed to write log:', err);
    });
}

module.exports = { logToFile };
