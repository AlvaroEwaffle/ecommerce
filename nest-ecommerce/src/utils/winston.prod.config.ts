import * as winston from 'winston';

export const winstonProdConfig: winston.LoggerOptions = {
  level: 'info',
  levels: winston.config.npm.levels,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/errors.log', level: 'error' }),
  ],
};
