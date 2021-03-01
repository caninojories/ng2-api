import * as express from 'express';
import { ProductApi } from './index';

export class ProductGetApi extends ProductApi {
  constructor() {
    super();
  }

  private static instance: ProductGetApi = new ProductGetApi();

  private findMany() {
    this.router.get('/products', async (_req, res, _next) => {
      const products = await this.productModel.getModel().find({});
      return res.status(200).json(products);
    });

    return this;
  }

  private findOne() {
    this.router.get('/products/:id', async (req, res, _next) => {
      const products = await this.productModel.getModel().findOne({
        _id: req.params.id,
      });
      return res.status(200).json(products);
    });

    return this;
  }

  public static getInstance(): express.Router {
    return this.instance.onInit().initializeModels().findOne().findMany().router;
  }
}
