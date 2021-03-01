import * as moment from 'moment';
import * as chalk from 'chalk';
const winston = require('winston');
import * as args from './argv';

export class Logger {
  constructor(private file: string, private message: string, private type: string) {
    if (this.type === 'error' && args.getArgv('--logs')) {
      this.logs()[this.type]({
        file: this.file,
        message: this.message,
      });
    }
  }

  logs(): void {
    return new winston.Logger({
      transports: [
        new winston.transports.Console({
          timestamp: function () {
            return moment().format('MMM Do YY hh:mm:ss A');
          },
          prettyPrint: true,
          formatter: function (options) {
            let levelColor = 'green';
            if (options.level === 'warn') {
              levelColor = 'yellow';
            } else if (options.level === 'error') {
              levelColor = 'red';
            }
            return (
              chalk.magenta(options.meta.file) +
              ':' +
              chalk[levelColor](options.level.toUpperCase()) +
              ':' +
              chalk.blue(options.timestamp()) +
              (options.meta && Object.keys(options.meta).length
                ? '  ---->  ' + chalk.cyan(JSON.stringify(options.meta.message))
                : '')
            );
          },
        }),
      ],
    });
  }
}
