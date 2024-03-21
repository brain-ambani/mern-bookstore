import { Book } from "../models/bookModel.js";
import mongoose from "mongoose";

// post a new book

const newBook = async (req, res) => {
  const { title, author, publishYear } = req.body;

  // validate the request
  if (!title || !author || !publishYear)
    return res.status(400).send("All fields are required");

  try {
    const book = await Book.create({ title, author, publishYear });
    res.status(201).send(book);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export default newBook;
