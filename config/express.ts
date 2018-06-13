import {
  injectable,
  inject,
  Container
} from 'inversify';
import 'reflect-metadata';
import {
  Logger
} from '../util-lib/logger';
import * as express from 'express';
import * as path from 'path';
import * as bodyparser from 'body-parser';
import * as bcrypt from 'bcryptjs';
import * as compression from 'compression';
import * as fs from 'fs';
import * as jwtsimple from 'jwt-simple';
import * as methodoverride from 'method-override';
import * as moment from 'moment';
import * as mongoose from 'mongoose';
import * as morgan from 'morgan';
import * as servestatic from 'serve-static';
import * as ejs from 'ejs';
import * as cors from 'cors';
import chalk from 'chalk';
import {
  ErrorHandler
} from '../util-lib/error-handler';
import {
  ApiNotFoundError
} from '../util-lib/errors';
import {ResponseData} from '../util-lib/response-data';
import {
  ApiFactory
} from '../api/api-factory';

export class ExpressConfig {
  constructor (private app: express.Application) {}

  public bindConfig() {
    this.setConfig();
    this.loadMiddleware();
    this.loadRoutes();
    this.loadErrorHandler();
  }

  private setConfig (): void {
    this.app.set('view engine', 'ejs');
    this.app.engine('html', ejs.renderFile);
    this.app.set('x-powered-by', false);
    this.app.set('port', 3000);
  }

  private loadMiddleware() {
    this.app.use(compression());
    this.app.use(morgan('dev', {
      skip: (req, res) => {
        return req.method === 'OPTIONS';
      }
    }));
    this.app.use(bodyparser.urlencoded({
      extended: true,
      limit: '50mb'
    }));
    this.app.use(bodyparser.json({limit: '50mb'}));
    this.app.use(methodoverride((req, res) => {
      if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        let method = req.body._method
        delete req.body._method
        return method
      }
    }))
    this.app.use(cors());
  }

  private loadRoutes() {
    this.app.all('*', (
      request: Request,
      response: express.Response,
      next: express.NextFunction
    ) => {
      next();
    });

    ApiFactory.createAllRoutes(this.app);

    this.app.get('*', (req: any, res: any, next: any) => {
      res.statusCode = 404;
      res.json(ResponseData.create404('Unable to find the requested path.'));
      Logger.error(`An unregistered path '${req.originalUrl}' was requested`);
    });
  }

  private loadErrorHandler() {
    this.app.use(ErrorHandler.init());
  }
}
