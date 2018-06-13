import {
  ApiFactory
} from './api/api-factory';
import {
  Server
} from './server';
import {
  Container
} from 'inversify';
import {
  Injectable
} from './util-lib/injectable';
import TYPES from './constant/types';
import * as express from 'express';
import * as expressValidator from 'express-validator';

export class Api {
  constructor () {
    this.injectableContainer.bind<Injectable>(TYPES.Injectable).to(Injectable);
    this.injectable = this.injectableContainer.get<Injectable>(TYPES.Injectable);
    this.app = this.injectable.server.getApp();
    this.loadRoutes();
  }

  private static instance: Api = new Api();
  private injectableContainer = new Container();
  private injectable: Injectable;
  private app: any;

  private loadRoutes() {
    ApiFactory.createAllRoutes(this.app);
  }

  public static getApp() {
    return Api.instance.app;
  }
}