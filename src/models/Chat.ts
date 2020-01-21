import { Document, model, Model, Schema } from "mongoose";

export interface IChatModel extends Document {
  message: string;
  createdAt: Date;
  updatedAt: Date;
}

const chatSchema: Schema = new Schema({
  message: {
    type: String,
    required: [true, "Message field is required"]
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const Chat: Model<IChatModel> = model<IChatModel>(
  "Chat",
  chatSchema,
  "chats"
);
