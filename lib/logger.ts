import { format, createLogger, transports } from 'winston';
import dotenv from 'dotenv';

dotenv.config();

const mFormat = format.printf(({level, message, timestamp, stack}) => {
    return `[${timestamp}] ${level}: ${message || stack}`;
});

const logger = createLogger({
    level: process.env.LOGGER_LEVEL || 'info',
    format: format.combine(
        format.colorize(),
        format.timestamp({format: 'YYYY-MM-DD HH:mm:ss TZ'}),
        format.errors({ stack: true }),
        mFormat
    ),
    transports: [new transports.Console()]
});

export default logger;