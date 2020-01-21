const mongoose = require("mongoose");

// debug
const debug = process.env.NODE_ENV === "development";
mongoose.set("debug", debug);

// connect
mongoose
  .connect(process.env.MONGO_URI, {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(conn => console.log(`MongoDB Connected: ${conn.connection.host}`))
  .catch(error => console.log(error));

module.exports.Message = require("./Message");
module.exports.User = require("./User");
