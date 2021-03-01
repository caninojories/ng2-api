import * as express from 'express';
import { ProductApi } from './index';
import { Cart } from '../../model/cart';
import { ResponseData } from '../../util-lib/response-data';

export class CartPostApi extends ProductApi {
  constructor() {
    super();
  }

  private static instance: CartPostApi = new CartPostApi();

  private insertOne() {
    this.router.post('/carts', async (req, res, _next) => {
      const cart = req.body as Cart;

      await this.cartModel.getModel().insertMany([cart]);
      return res.status(201).json(ResponseData.createOk());
    });

    return this;
  }

  public static getInstance(): express.Router {
    return this.instance.onInit().initializeModels().insertOne().router;
  }
}
