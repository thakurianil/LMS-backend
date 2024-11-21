import express from "express";
import { addBook, displayBooks } from "../models/books/bookModel.js";
import { authenticateJWT, isAdmin } from "../utils/authenticate.js";

export const BookRouter = express.Router();

BookRouter.post("/", authenticateJWT, isAdmin, async (req, res) => {
  try {

    const book = await addBook(req.body);
console.log(book);

    if (book)
      return res.json({
        status: "success",
        message: "Book Added Successfull",
        book,
      });
    else
      return res.json({
        status: "error",
        message: "Book Add Failed",
      });
  } catch (error) {
    if (error?.code == 11000) {
      return res.json({
        status: "error",
        message: "Duplicate Data",
      });
    } else {
      return res.json({
        status: "error",
        message: "Something went wrong",
        error,
      });
    }
  }
});

BookRouter.get("/displayAll", async (req, res) => {
  try {
    let page = req.query.page || 1;
    let limit = req.query.limit || 10;

    const books = await displayBooks(page, limit);

    let bookData = [...books];

    if (bookData)
      return res.json({
        status: "success",
        message: "Book Displayed Successfully",
        bookData,
      });
    else
      return res.json({
        status: "error",
        message: "Book Displayed Failed",
      });
  } catch (error) {
    return res.json({
      status: "error",
      message: "Something went wrong",
      error,
    });
  }
});
