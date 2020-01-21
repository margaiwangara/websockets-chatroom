import { Schema, Model, Document, model } from "mongoose";

interface IUserModel extends Document {
  username: string;
  email?: string;
  name?: string;
  password?: string;
}

const userSchema: Schema = new Schema({
  username: {
    type: String,
    required: [true, "Username field is required"],
    unique: true,
    maxlength: [50, "Username must be less than 50 chars long"]
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const User: Model<IUserModel> = model<IUserModel>("User", userSchema);

module.exports = User;
