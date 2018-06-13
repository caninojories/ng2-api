import * as express from 'express';
import {
  Logger
} from '../../util-lib/logger';

export class UserApi {
  constructor() {}

  public router: express.Router = new express.Router();

  public onInit() {
    this.router.use((req, res, next) => {
      Logger.info(`Time: ' Date.now()`);
      next()
    });

    return this;
  }
}