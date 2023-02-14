import winston from 'winston';

export const logInfo = () => {

   const logger = winston.createLogger({

        level: 'info',
        format: winston.format.json(),
        defaultMeta: { service: 'api-gateway-service' },
        transports: [new winston.transports.File({ filename: './logs/error.log', level: 'error' }), new winston.transports.File({ filename: './logs/logs.txt' })]
    })

    return logger;
}