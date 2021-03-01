import { ApiFactory } from './api/api-factory';
import * as express from 'express';
import { ExpressConfig } from './config/express';
import { ResponseData } from './util-lib/response-data';
import { Logger } from './util-lib/logger';
import { ErrorHandler } from './util-lib/error-handler';

export class Api {
  public app: express.Application = express();
  private expressConfig: ExpressConfig = new ExpressConfig(this.app);
  private static instance: Api = new Api();

  public onInit(): void {
    this.expressConfig.bindConfig();
    this.loadRoutes();
    this.loadErrorHandler();
  }

  private loadRoutes() {
    this.app.all(
      '*',
      (_request: express.Request, _response: express.Response, next: express.NextFunction) => {
        next();
      }
    );

    ApiFactory.createAllRoutes(this.app);

    this.app.get(
      '*',
      (req: express.Request, res: express.Response, _next: express.NextFunction) => {
        res.statusCode = 404;
        res.json(ResponseData.create404('Unable to find the requested path.'));
        Logger.error(
          (`An unregistered path '${req.originalUrl}' was requested` as unknown) as Error
        );
      }
    );
  }

  private loadErrorHandler() {
    this.app.use(ErrorHandler.init());
  }

  public static getApi(): Api {
    return Api.instance;
  }
}
