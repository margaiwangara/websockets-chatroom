import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import path from "path";

// Inits
const app = express();
dotenv.config({ path: path.resolve(__dirname, "../config/config.env") });

// Routes
import { User } from "./models";
User.find()
  .then(data => console.log(data))
  .catch(error => console.log(error));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
