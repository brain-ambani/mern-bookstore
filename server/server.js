import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";

dotenv.config();
const port = process.env.PORT || 3300;
const MongoDB = process.env.MONGODB_URI;

const app = express();

// Middleware for JSON body parsing
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Hello World");
});

// Route to save a new book
app.post("/books", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear)
      return res.status(400).send("All fields are required");
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };
    const book = await Book.create(newBook);

    res.status(201).send(book);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

// Route to get all books
app.get("/books", async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });

    return res.status(200).send({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

mongoose
  .connect(MongoDB)
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is connected to the DB and running on port ${port}`);
    });
  })
  .catch((err) => console.log(err));
