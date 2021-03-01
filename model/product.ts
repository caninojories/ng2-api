import { injectable } from 'inversify';
import { Document, model, Model, Schema } from 'mongoose';

export interface Product extends Document {
  name: string;
  url: string;
  description: string;
  price: number;
  createdAt?: Date;
}

@injectable()
export class ProductModel {
  constructor() {
    this.createModel();
  }

  private productModel: Model<Product>;

  private createModel(): void {
    try {
      this.productModel = model('Product');
    } catch (error) {
      const productSchema = new Schema(
        {
          name: {
            type: String,
          },
          url: {
            type: String,
          },
          description: {
            type: String,
          },
          price: {
            type: Number,
          },
          createdAt: {
            type: Date,
            default: Date.now,
          },
        },
        { collection: 'Products' }
      );

      this.productModel = model<Product>('Product', productSchema);
    }
  }

  public getModel(): Model<Product> {
    return this.productModel;
  }
}
