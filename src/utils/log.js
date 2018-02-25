/*
 * @Author: hilshire
 * @Date: 2018-02-25 14:30:17
 */
const log4js = require('log4js');

log4js.configure({
    appenders: {
        error: {
            type: 'dateFile',
            filename: 'log/error.log'
        },
        app: {
            type: 'file',
            filename: 'log/app.log'
        },
        stdout: {
            type: 'stdout'
        }
    },
    categories: {
        default: {
            appenders: ['stdout', 'app'],
            level: 'debug'
        },
        error: {
            appenders: ['error'],
            level: 'error'
        }
    }
});

module.exports = log4js;
