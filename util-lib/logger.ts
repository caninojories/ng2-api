import * as winston from 'winston';

export class Logger {
  private static instance: Logger = new Logger();
  private logger = winston.createLogger({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.timestamp(),
      winston.format.printf(info => {
        const { timestamp, level, message } = info;

        const ts = timestamp.slice(0, 19).replace('T', ' ');
        return `${ts} [${level}]: ${
          Object.keys(message).length ? JSON.stringify(message, null, 2) : ''
        }`;
      })
    ),
    transports: [
      new winston.transports.Console({
        silent: process.argv.indexOf('--silent') >= 0,
      }),
    ],
  });

  public static getInstance(): Logger {
    return this.instance;
  }

  public static info(message: string): void {
    Logger.getInstance().logger.info(message);
  }

  public static error(message: Error): void {
    Logger.getInstance().logger.error(message);
  }
}
