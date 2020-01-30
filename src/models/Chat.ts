import { model, Model, Schema } from "mongoose";
import { IChatModel } from '../interfaces/model';

const chatSchema: Schema = new Schema({
  message: {
    type: String,
    required: [true, "Message field is required"]
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

const Chat: Model<IChatModel> = model<IChatModel>(
  "Chat",
  chatSchema,
  "chats"
);

export default Chat;