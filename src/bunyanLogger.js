/* eslint-disable no-undef */
import bunyan from 'bunyan';
import bformat  from 'bunyan-format';

const formatOut = bformat({ outputMode: 'short', color: true });

export const logger2 = bunyan.createLogger({
    name: 'LOG',
    streams: [
        {
            level: 'error',
            path: __dirname + '/logs/appError.log',
            stream: formatOut,
        },
        {
            level: 'info',
            path: __dirname + '/logs/logFile.log'
        }
    ],
    localtime: new Date().toString(),
    src: true
});