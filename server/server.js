import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
const port = process.env.PORT || 3300;
const MongoDB = process.env.MONGODB_URI;

const app = express();

app.get("/", (req, res) => {
  res.status(200).send("Hello World");
});

mongoose
  .connect(MongoDB)
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is connected to the DB and running on port ${port}`);
    });
  })
  .catch((err) => console.log(err));
