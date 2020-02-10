import { Schema, Model, model } from 'mongoose';
import { IUserModel } from '../interfaces/model';

const userSchema: Schema = new Schema({
  username: {
    type: String,
    required: [true, 'Username field is required'],
    unique: true,
    maxlength: [50, 'Username must be less than 50 chars long'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User: Model<IUserModel> = model<IUserModel>('User', userSchema, 'users');

export default User;
