export default class Logger {

    constructor(module, fileName) {
        this.module = module || '';
        this.fileName = fileName || '';
        this.prefix = `${module}[${fileName}]`;
    }

    log(...args) {
        console.log(`${this.prefix}Log: ${args}`);
    }

    info(...args) {
        console.info(`${this.prefix}Info: ${args}`);
    }

    error(...args) {
        console.error(`${this.prefix}Error: ${args}`);
    }

    replacerFun(key, value) {
        if (typeof value === 'undefined') {
            return '***undefined***';
        }
    }

    stringify(data, func, indent = 2) {
        return JSON.stringify(data, func, indent);
    }
}