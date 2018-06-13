import * as express from 'express';
import {
  Logger
} from '../../util-lib/logger';
import {
  UserApi
} from './index'

export class UserGetApi extends UserApi {
  constructor() {
    super();
  }

  private static instance: UserGetApi = new UserGetApi();

  private onGetUser() {
    this.router.get('/user', (req, res, next) => {
      res.status(200).json('OK');
    });

    return this;
  }

  public static getInstance (): UserGetApi {
    return this.instance.onInit()
      .onGetUser()
      .router;
  }
}