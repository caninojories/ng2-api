import * as express from 'express';
import { ProductGetApi } from './product/get';
import { CartPostApi } from './cart/post';

export class ApiFactory {
  private static instance: ApiFactory = new ApiFactory();
  private app: express.Application;
  private URLPrefixed = '/api/v1';

  public static createAllRoutes(app: express.Application): void {
    this.instance.app = app;
    this.instance.createProductRouter();
    this.instance.createCartRouter();
  }

  public createProductRouter(): this {
    this.app.use(this.URLPrefixed, ProductGetApi.getInstance());

    return this;
  }

  public createCartRouter(): void {
    this.app.use(this.URLPrefixed, CartPostApi.getInstance());
  }
}
