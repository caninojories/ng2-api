import * as express from 'express';
import { injectable } from 'inversify';
import * as http from 'http';
import 'reflect-metadata';
import { Mongo } from './services/mongo';
import { Logger } from './util-lib/logger';
import { Api } from './api';

@injectable()
export class Server {
  private app: express.Application = Api.getApi().app;
  private server: http.Server;
  private mongo: Mongo = new Mongo();

  private onAfterInit() {
    this.server = http.createServer(this.app);
    this.server.on('error', this.onError);
    this.server.on('listening', this.onListening);
  }

  start(): void {
    Logger.info('Starting the server');
    this.onAfterInit();
    Api.getApi().onInit();
    this.server.listen(8113);
    this.mongo.init();
  }

  private onError(error: NodeJS.ErrnoException): void {
    if (error.syscall !== 'listen') {
      throw error;
    }
    const bind =
      typeof this.app.get('port') === 'string'
        ? 'Pipe ' + this.app.get('port')
        : 'Port ' + this.app.get('port');
    this.app.get('port');
    switch (error.code) {
      case 'EACCES':
        Logger.error((`${bind} requires elevated privileges` as unknown) as Error);
        process.exit(1);
      case 'EADDRINUSE':
        Logger.error((`${bind} is already in use` as unknown) as Error);
        process.exit(1);
      default:
        throw error;
    }
  }

  private onListening(): void {
    const addr = ((this as unknown) as http.Server).address();
    const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
    Logger.info(`Listening on ${bind}`);

    process.on('unhandledRejection', (error: any) => {
      Logger.info(`unhandledRejection ${error.message}`);
    });
  }

  public getApp(): express.Application {
    return this.app;
  }
}
