import express from "express";
import { Book } from "../models/bookModel.js";

import { booksController } from "../controllers/booksController.js";

const router = express.Router();

// Route to save a new book
router.post("/", booksController.newBook);

// Route to get all books
router.get("/", booksController.getBooks);

// Route to get a single book by ID
router.get("/:id", booksController.getBookById);

// Route for updating a book by ID

router.patch("/:id", booksController.updateBook);

// Route for deleting a book by ID

router.delete("/:id", booksController.deleteBook);

export default router;
