import express from "express";
import { Book } from "../models/bookModel.js";
import newBook from "../controllers/booksController.js";

const router = express.Router();

// Route to save a new book
router.post("/", newBook);

// Route to get all books
router.get("/", async (req, res) => {
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

// Route to get a single book by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById({ _id: id });

    res.status(200).send(book);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

// Route for updating a book by ID

router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const book = await Book.findByIdAndUpdate({ _id: id }, { ...req.body });

    res.status(200).send(book);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

// Route for deleting a book by ID

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const book = await Book.findByIdAndDelete({ _id: id });

    res.status(200).send(book);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

export default router;
