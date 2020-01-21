import express, { Application } from "express";
import graphqlHTTP from "express-graphql";
import dotenv from "dotenv";
import path from "path";

// Inits
const app: Application = express();
dotenv.config({ path: path.resolve(__dirname, "../config/config.env") });

// Routes
import schema from "./graphql/queries";
app.use(
  "/graphql",
  graphqlHTTP({
    graphiql: true,
    schema
  })
);

const PORT: number = 5000 || process.env.PORT;

app.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
