import { Document } from 'mongoose';

export interface IChatModel extends Document {
  message: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserModel extends Document {
  username: string;
  email?: string;
  name?: string;
  password?: string;
  createdAt: Date;
  updatedAt?: Date;
}