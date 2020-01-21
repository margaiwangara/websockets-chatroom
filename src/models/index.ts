import mongoose from "mongoose";
import User from "./User";
import Chat from "./Chat";

// Init
const debug: boolean = process.env.NODE_ENV == "development" ? true : false;

mongoose.set("debug", debug);
mongoose
  .connect(process.env.MONGO_URI, {
    useFindAndModify: false,
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(conn => console.log(`MongoDB Connected`, conn))
  .catch(error => console.log(error));

module.exports.User = User;
module.exports.Chat = Chat;
