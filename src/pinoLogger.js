/* eslint-disable no-undef */
import pino from 'pino';

const logger = pino({
    level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
});

export { logger };