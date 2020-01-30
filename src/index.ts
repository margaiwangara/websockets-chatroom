import express, { Application, NextFunction, Request, Response } from "express";
import graphqlHTTP from "express-graphql";
import * as dotenv from "dotenv";
import * as path from "path";
import schema from "./graphql/queries";
import * as socketio from 'socket.io';
import * as exphbs from 'express-handlebars';
import * as http from 'http';

// Inits
const app: Application = express();
const server: http.Server = http.createServer(app);

// dotenv config
dotenv.config({ path: path.resolve(__dirname, "../config/config.env") });

const hbs: Exphbs = exphbs.create({
  partialsDir: ['views/partials', 'views/layout'],
});

// static and templates
app.engine('handlebars', hbs.engine);
app.set("view engine", "handlebars");
app.set('views', path.resolve(__dirname, '../views'));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "../public")));
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
