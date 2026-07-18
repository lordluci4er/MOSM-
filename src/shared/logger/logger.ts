import fs from 'fs';
import path from 'path';
import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

const logDirectory = path.join(process.cwd(), 'logs');

if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory, { recursive: true });
}

const consoleTransport = new winston.transports.Console({
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    winston.format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level}: ${message}`;
    }),
  ),
});

const combinedTransport = new DailyRotateFile({
  dirname: logDirectory,
  filename: '%DATE%-combined.log',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxFiles: '30d',
});

const errorTransport = new DailyRotateFile({
  dirname: logDirectory,
  filename: '%DATE%-error.log',
  level: 'error',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxFiles: '30d',
});

export const logger = winston.createLogger({
  level: 'info',

  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json(),
  ),

  transports: [
    consoleTransport,
    combinedTransport,
    errorTransport,
  ],
});