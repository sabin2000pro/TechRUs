const winston = require('winston');

const logInfo = () => {

   const logger = winston.createLogger({

        level: 'info',
        format: winston.format.json(),
        defaultMeta: { service: 'authentication-service' },
        transports: [new winston.transports.File({ filename: './logs/error.log', level: 'error' }), new winston.transports.File({ filename: './logs/logs.txt' })]
    })

    return logger;
}

module.exports = {logInfo};