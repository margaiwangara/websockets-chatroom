import express, { Application, NextFunction, Request, Response } from "express";
import graphqlHTTP from "express-graphql";
import * as dotenv from "dotenv";
import * as path from "path";
import schema from "./graphql/queries";
import * as socketio from 'socket.io';
import * as http from 'http';

// Inits
const app: Application = express();
const server: http.Server = http.createServer(app);

// dotenv config
dotenv.config({ path: path.resolve(__dirname, "../config/config.env") });

// static and templates
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));

// Routes
const graphqlOptions = { graphiql: true, schema };
app.use("/graphql", graphqlHTTP(graphqlOptions));
app.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      return res.render("index");
    } catch (error) {
      next(error);
    }
  }
);

const PORT: number = parseInt(`${process.env.PORT}`, 10) || 5000;

server.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
