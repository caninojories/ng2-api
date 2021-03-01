import TYPES from '../constant/types';
import { Container } from 'inversify';
import { Server } from '../server';
import { ProductModel } from '../model/product';
import { CartModel } from '../model/cart';

const container = new Container();
container.bind<ProductModel>(TYPES.ProductModel).to(ProductModel);
container.bind<CartModel>(TYPES.CartModel).to(CartModel);
container.bind<Server>(TYPES.Server).to(Server);

export { container };
