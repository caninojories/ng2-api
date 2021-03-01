import { injectable } from 'inversify';
import { connection, connect } from 'mongoose';
import 'reflect-metadata';
import { Logger } from '../util-lib/logger';

@injectable()
export class Mongo {
  init(): any {
    let connecting = 0;
    if (connection.readyState === 0) {
      Logger.info('Mongo DB Started');

      let connectingState: any;

      connection.on('connecting', _ => {
        connectingState = setInterval(() => {
          connecting++;

          if (connecting <= 5) {
            Logger.info('Connecting...');
          }
        }, 300);
      });

      connection.on('connected', _ => {
        clearInterval(connectingState);
        Logger.info('Mongoose connection established successfully');
      });

      connection.on('disconnected', _ => {
        clearInterval(connectingState);
        Logger.info('Mongo DB connection closed');
      });

      connection.on('error', error => {
        clearInterval(connectingState);
        Logger.error((('Connection to mongo failed ' + error) as unknown) as Error);
      });

      /*close our connection when the app stop*/
      process.on('SIGINT', function () {
        connection.close(_ => {
          Logger.info('Mongoose disconnected on app termination');
          process.exit(0);
        });
      });

      return connect('mongodb://127.0.0.1:27017/edamama', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    }
  }
}
