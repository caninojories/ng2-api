import { injectable } from 'inversify';
import { Document, model, Model, Schema } from 'mongoose';

export interface Cart extends Document {
  productId: string;
}

@injectable()
export class CartModel {
  constructor() {
    this.createModel();
  }

  private cartModel: Model<Cart>;

  private createModel(): void {
    try {
      this.cartModel = model('Cart');
    } catch (error) {
      const productSchema = new Schema(
        {
          productId: {
            type: Schema.Types.ObjectId,
          },
          createdAt: {
            type: Date,
            default: Date.now,
          },
        },
        { collection: 'Carts' }
      );

      this.cartModel = model<Cart>('Cart', productSchema);
    }
  }

  public getModel(): Model<Cart> {
    return this.cartModel;
  }
}
