import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";

dotenv.config();
const port = process.env.PORT || 3300;
const MongoDB = process.env.MONGODB_URI;

const app = express();

// Middleware for JSON body parsing
app.use(express.json());

// Middleware for CORS
// Option 1: Allow all origins with Default CORS(*)
app.use(cors());
// Option 2: Allow Custom Origin
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: "GET,PATCH,POST,DELETE",
//     allowedHeaders: "Content-Type",
//   })
// );

app.use("/api/books", booksRoute);

mongoose
  .connect(MongoDB)
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is connected to the DB and running on port ${port}`);
    });
  })
  .catch((err) => console.log(err));
