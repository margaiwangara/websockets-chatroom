import mongoose from "mongoose";
import User from "./User";
import Chat from "./Chat";

// Init
const mongoConfig: object = {
  useFindAndModify: false,
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
};

export default async function() {
  const debug: boolean = process.env.NODE_ENV == "development" ? true : false;
  mongoose.set("debug", debug);
  try {
    const conn = await mongoose.connect(
      `${process.env.MONGO_URI}`,
      mongoConfig
    );
    console.log(`MongoDB Connected: ${(conn.connection as any).host}`);
  } catch (error) {
    console.log(error);
  }
}

export { User, Chat };
