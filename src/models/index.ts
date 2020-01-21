import mongoose from "mongoose";

// models
import { User, IUserModel } from "./User";
import { Chat, IChatModel } from "./Chat";

// Init
const debug: boolean = process.env.NODE_ENV == "development" ? true : false;
const uri: string =
  process.env.MONGO_URI || "mongodb://localhost:27017/express_websockets";

mongoose.set("debug", debug);
mongoose
  .connect(uri, {
    useFindAndModify: false,
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log(`MongoDB Connected`))
  .catch(error => console.log(error));

export { User, IUserModel, Chat, IChatModel };
