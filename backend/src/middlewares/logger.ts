import winston from 'winston';
import expressWinston from 'express-winston';
import path from 'path';

const logsPathRequests = path.join(__dirname, '../public/temp/requests.log');
const logsPathErrors = path.join(__dirname, '../public/temp/errors.log');

const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({ filename: logsPathRequests }),
  ],
  format: winston.format.json(),
});

const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({ filename: logsPathErrors }),
  ],
  format: winston.format.json(),
});

export { requestLogger, errorLogger };
