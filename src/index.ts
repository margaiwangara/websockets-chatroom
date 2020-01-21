import express, { Application, NextFunction, Request, Response } from "express";
import graphqlHTTP from "express-graphql";
import dotenv from "dotenv";
import path from "path";

// Inits
const app: Application = express();
dotenv.config({ path: path.resolve(__dirname, "../config/config.env") });

// static and templates
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Routes
import schema from "./graphql/queries";
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

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
