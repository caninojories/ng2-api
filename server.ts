import * as express from 'express';
import { injectable, inject, Container } from 'inversify';
import 'reflect-metadata';
import TYPES from './constant/types';
import {
  ExpressConfig
} from './config/express';
import {
  Mongo
} from './services/mongo';
import {
  Logger
} from './util-lib/logger';
import * as http from 'http';

@injectable()
export class Server {
  constructor () {
    this.onInit();
  }

  private expressConfig: ExpressConfig;
  private app: express.Application = express();
  private server: http.Server;

  private onInit() {
    this.expressConfig = new ExpressConfig(this.app);
  }

  private onAfterInit() {
    this.server = http.createServer(this.app);
    this.server.on('error', this.onError);
    this.server.on('listening', this.onListening);
  }

  start (): void {
    Logger.info('Starting the server');
    this.onAfterInit();
    this.expressConfig.bindConfig();
    this.server.listen(8113);
  }

  private onError(error: NodeJS.ErrnoException): void {
    if (error.syscall !== 'listen') {
      throw error;
    }
    let bind = (typeof this.app.port === 'string') ? 'Pipe ' + this.app.port : 'Port ' + this.app.port;
    switch (error.code) {
      case 'EACCES':
        Logger.error(`${bind} requires elevated privileges`);
        process.exit(1);
        break;
      case 'EADDRINUSE':
        Logger.error(`${bind} is already in use`);
        process.exit(1);
        break;
      default:
        throw error;
    }
  }

  private onListening(): void {
    const self: any = this;
    let addr = self.address();
    let bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;
    Logger.info(`Listening on ${bind}`);

    process.on('unhandledRejection', (error: any) => {
      Logger.info(`unhandledRejection ${error.message}`);
    });
  }

  public getApp() {
    return this.app;
  }
}