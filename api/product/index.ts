import * as express from 'express';
import { ProductModel } from '../../model/product';
import { Logger } from '../../util-lib/logger';
import TYPES from '../../constant/types';
import { container } from '../../util-lib/injectable';

export class ProductApi {
  public router: express.Router = express.Router();
  public productModel: ProductModel;

  public onInit(): this {
    this.router.use((_req, _res, next) => {
      Logger.info(`Time: ' Date.now()`);
      next();
    });

    return this;
  }

  public initializeModels(): this {
    this.productModel = container.get<ProductModel>(TYPES.ProductModel);

    return this;
  }
}
