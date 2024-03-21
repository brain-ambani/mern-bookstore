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

// get all books

const getBooks = async (req, res) => {
  const books = await Book.find().sort({ createdAt: -1 });

  return res.status(200).send({
    count: books.length,
    data: books,
  });
};

// get a single book by ID

const getBookById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("Book not found");

  const book = await Book.findById(id);

  if (!book) return res.status(404).send("Book not found");

  return res.status(200).send(book);
};

// update a book by ID

const updateBook = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("Book not found");

  const book = await Book.findOneAndUpdate({ _id: id }, { ...req.body });

  res.status(200).send(book);
};

// delete a book by ID

const deleteBook = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("Book not found");

  const book = await Book.findOneAndDelete({ _id: id });

  if (!book) return res.status(404).send("Book not found");

  res.status(200).send(book);
};

// export the controllers

export const booksController = {
  newBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
};
