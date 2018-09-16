import winston from 'winston';
import config from '../config';

const {
  combine, timestamp, printf, colorize,
} = winston.format;

const loggerFormat = printf(info => `${info.timestamp} - ${info.level}: ${info.message}`);

export default winston.createLogger({
  level: config.env.MODE === 'production' ? 'warn' : 'debug',
  format: combine(
    colorize(),
    timestamp(),
    loggerFormat,
  ),
  transports: [
    new winston.transports.Console(),
  ],
});
