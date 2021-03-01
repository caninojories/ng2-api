import * as express from 'express';
import { CartModel } from '../../model/cart';
import { Logger } from '../../util-lib/logger';
import TYPES from '../../constant/types';
import { container } from '../../util-lib/injectable';

export class ProductApi {
  public router: express.Router = express.Router();
  public cartModel: CartModel;

  public onInit(): this {
    this.router.use((_req, _res, next) => {
      Logger.info(`Time: ' Date.now()`);
      next();
    });

    return this;
  }

  public initializeModels(): this {
    this.cartModel = container.get<CartModel>(TYPES.CartModel);

    return this;
  }
}
