import {
  injectable,
  inject
} from 'inversify';
import {
  Document,
  model,
  Model,
  Schema
} from 'mongoose';

interface IPost extends Document {
  post: string;
  user: object;
  updatedAt: Date,
  createdAt: Date
}

export class PostModel {
  constructor () {
    this.createModel();
  }

  private postModel: Model<IPost>;

  private createModel(): void {
    const postSchema = new Schema({
      post: {
        type: String
      },
      user: {},
      updatedAt: Date,
      createdAt: {
        type: Date,
        default: Date.now
      }
    }, { collection: 'Posts' });

    this.postModel = model<IPost>('User', postSchema);
  }

  private getModel(): Model<IPost> {
    return this.postModel;
  }
}
