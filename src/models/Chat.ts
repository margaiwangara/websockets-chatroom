import { Document, model, Model, Schema } from "mongoose";

interface IChatModel extends Document {
  message: string;
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

const Chat: Model<IChatModel> = model<IChatModel>("Chat", chatSchema);

export default Chat;
