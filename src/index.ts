import express from "express";
import dotenv from "dotenv";
import path from "path";

// express init
const app = express();

// dotenv init
dotenv.config({ path: path.resolve(__dirname, "../config/.env") });

const PORT: number = 5000 || process.env.PORT;

app.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
