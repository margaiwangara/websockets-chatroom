import express, { Application, NextFunction, Request, Response } from "express";
import graphqlHTTP from "express-graphql";
import * as dotenv from "dotenv";
import * as path from "path";
import schema from "./graphql/queries";
import socketio from "socket.io";
import * as exphbs from "express-handlebars";
import * as http from "http";
import connectDB from "./models";

// Inits
const app: Application = express();
const server: http.Server = http.createServer(app);
const io = socketio(server);

// dotenv config
dotenv.config({ path: path.resolve(__dirname, "../config/config.env") });

// Connect DB
connectDB();

const hbs: Exphbs = exphbs.create({
  partialsDir: "view/partials",
  layoutsDir: "views/layouts",
  extname: ".hbs"
});

// static and templates
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", path.resolve(__dirname, "../views"));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "../public")));
app.use(express.urlencoded({ extended: false }));

const msgs = ["Hello", "How are you?", "Code", "Programming"];

// Socket IO @TODO: Split to different file
io.on("connection", function(socket) {
  console.log("User connected");

  // on message send
  socket.on("chat message", function(msg) {
    msgs.push(msg);
    io.emit("chat message", msg);
    io.emit("load messages", msgs);
  });

  socket.on("load messages", function() {
    io.emit("load messages", msgs);
  });
  // on disconnect
  socket.on("disconnect", function() {
    console.log("User disconnected");
  });
});

// Routes
const graphqlOptions = { graphiql: true, schema };
app.use("/graphql", graphqlHTTP(graphqlOptions));
app.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    return res.render("home", { title: "Home" });
  } catch (error) {
    next(error);
  }
});

const PORT: number = parseInt(`${process.env.PORT}`, 10) || 5000;

server.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
