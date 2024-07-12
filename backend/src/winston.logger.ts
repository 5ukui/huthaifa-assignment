import { utilities as nestWinstonModuleUtilities } from 'nest-winston';
import * as winston from 'winston';

export const WinstonLogger = winston.createLogger({
    level: 'error',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message, context }) => {
        return `${timestamp} [${context || 'Application'}] ${level}: ${message}`;
        }),
    ),
    transports: [
        new winston.transports.File({
        filename: 'logs/error.log',
        level: 'error',
        }),
        new winston.transports.Console({
        format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.colorize(),
            nestWinstonModuleUtilities.format.nestLike('MyApp', { prettyPrint: true }),
        ),
        }),
    ],
});
