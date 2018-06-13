import {
  injectable,
  inject
} from 'inversify';
import {
  Document,
  model,
  Model,
  connection,
  connect
} from 'mongoose';
import chalk from 'chalk';
import 'reflect-metadata';

@injectable()
export class Mongo {
  constructor(
  ) {
    // private connection? : String
    // this._connection = this.connection;
  }

  private _connection;

  init() : any {
    let connecting = 0;
    if (connection.readyState === 0) {
      console.log(chalk.red.bold('Mongo DB Started'));

      let connectingState;

      connection.on('connecting', _ => {
        connectingState = setInterval(() => {
          connecting++;

          if (connecting <= 5) {
            console.log(chalk.green.bold('Connecting...'));
          }
        }, 300);
      });

      connection.on('connected', _ => {
        clearInterval(connectingState);
        console.log(chalk.cyan.bold('Mongoose connection established successfully'));
      });

      connection.on('disconnected', _ => {
        clearInterval(connectingState);
        console.log(chalk.red.bold('Mongo DB connection closed'));
      });

      connection.on('error', (error) => {
        clearInterval(connectingState);
        console.error('Connection to mongo failed ' + error);
      });

      /*close our connection when the app stop*/
      process.on('SIGINT', function() {
        connection.close(_ => {
          console.log('Mongoose disconnected on app termination');
          process.exit(0);
        });
      });

      return connect('mongodb://192.168.0.140:27017/builder');
    }
  }
}
