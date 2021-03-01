import { Mongo } from '../services/mongo';
import { ProductModel, Product } from '../model/product';
import { Logger } from '../util-lib/logger';

const mongo = new Mongo();
const product = new ProductModel();

const products: Partial<Product>[] = [
  {
    name: 'Product1',
    url: 'test',
    description: 'Product 1',
    price: 1,
  },
  {
    name: 'Product2',
    url: 'test',
    description: 'Product 2',
    price: 2,
  },
  {
    name: 'Product3',
    url: 'test',
    description: 'Product 3',
    price: 3,
  },
];

mongo
  .init()
  .then(() => {
    return product.getModel().insertMany((products as unknown) as Product);
  })
  .then(() => {
    Logger.info('Finished');
    process.exit(0);
  });
