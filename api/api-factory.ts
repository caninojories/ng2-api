import {
  UserGetApi
} from './user/get';
import * as express from 'express';

export class ApiFactory {
  constructor() {}

  private static instance: ApiFactory = new ApiFactory();
  private app: express.Application;
  private URLPrefixed: string = '/api/v1';

  public static createAllRoutes(app: express.Application) {
    this.instance.app = app;
    this.instance.createUserRouter()
  }

  public createUserRouter() {
    this.app.use(this.URLPrefixed, UserGetApi.getInstance());

    return this;
  }
}