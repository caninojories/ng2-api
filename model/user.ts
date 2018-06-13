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
import * as bcrypt from 'bcryptjs';

interface IUser extends Document {
  email: string;
  fullName: string;
  password: string,
  createdAt: Date,
  updatedAt: Date
}

@injectable()
export class UserModel {
  constructor () {
    this.createModel();
  }

  private userModel: Model<IUser>;

  private createModel(): void {
    const userSchema = new Schema({
      email: {
        type: String,
        unique: true,
        required: true
      },
      fullname: {
        type: String,
        required: true
      },
      password: String,
      updatedAt: Date,
      createdAt: {
         type: Date,
         default: Date.now
      }
    }, { collection: 'Users' });

    userSchema.pre('save', function (next) {
      let user: any = this;

      if (!user.isModified('password')) {
        return next();
      }

      bcrypt.genSalt(10, (err, salt) => {
        if (err) {
          return next(err);
        }

      bcrypt.hash(user.password, salt, function(error, hash) {
          if (error) {
            return next (error);
          }

          user.password = hash;
          next();
        });
      });
    });

    userSchema.methods.toJSON = function() {
      let user = this.toObject();
      delete user.password;

      return user;
    };

    userSchema.methods.comparePassword = function(password, callback) {
      bcrypt.compare(password, this.password, callback);
    };

    this.userModel = model<IUser>('User', userSchema);
  }

  private getModel(): Model<IUser> {
    return this.userModel;
  }
}

