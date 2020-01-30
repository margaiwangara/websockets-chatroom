import mongoose from "mongoose";
import User from "./User";
import Chat from "./Chat";
import * as dotenv from 'dotenv';
import * as path from 'path';

// dotenv config
dotenv.config({ path: path.resolve(__dirname, "../../config/config.env") });
// Init
const debug: boolean = process.env.NODE_ENV == "development" ? true : false;
const uri: string = `${process.env.MONGO_URI}`;

mongoose.set("debug", debug);
mongoose
  .connect(uri, {
    useFindAndModify: false,
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(conn =>
    console.log(`MongoDB Connected: ${(conn.connection as any).host}`)
  )
  .catch(error => console.log(error));

export { User, Chat };
