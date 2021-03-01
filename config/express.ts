import { injectable } from 'inversify';
import 'reflect-metadata';
import * as express from 'express';
import { urlencoded, json } from 'body-parser';
import * as compression from 'compression';
import * as methodoverride from 'method-override';
import * as morgan from 'morgan';
import * as ejs from 'ejs';
import * as cors from 'cors';

@injectable()
export class ExpressConfig {
  constructor(private app: express.Application) {}

  public bindConfig(): void {
    this.setConfig();
    this.loadMiddleware();
  }

  private setConfig(): void {
    this.app.set('view engine', 'ejs');
    this.app.engine('html', ejs.renderFile);
    this.app.set('x-powered-by', false);
    this.app.set('port', 3000);
  }

  private loadMiddleware() {
    this.app.use(compression());
    this.app.use(
      morgan('dev', {
        skip: (req, _res) => {
          return req.method === 'OPTIONS';
        },
      })
    );
    this.app.use(
      urlencoded({
        extended: true,
        limit: '50mb',
      })
    );
    this.app.use(json({ limit: '50mb' }));
    this.app.use(
      methodoverride((req, _res) => {
        if (req.body && typeof req.body === 'object' && '_method' in req.body) {
          // look in urlencoded POST bodies and delete it
          const method = req.body._method;
          delete req.body._method;
          return method;
        }
      })
    );
    this.app.use(cors());
  }
}
