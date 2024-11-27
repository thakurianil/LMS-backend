import express from "express";
import { addBook, deleteBookByID, displayBooks, getBooksByID, updateBookByID } from "../models/books/bookModel.js";
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


BookRouter.get("/displayBook/:id", async(req, res)=>{
    try {
        const bookId = req.params.id; 
    console.log(bookId);
    
        const book = await getBooksByID(bookId); 
        
        
        if (book) {
            res.status(200).json(book); 
        } else {
            res.status(404).json({ message: "Book not found" }); 
        }
    } catch (error) {
        console.error("Error fetching the book:", error);
        res.status(500).json({ message: "Internal server error" }); 
    }
})


BookRouter.delete("/deleteBook/:id", async(req,res)=>{
    try {
        const bookId = req.params.id; 
        const book = await deleteBookByID(bookId); 
        if (book) {
            res.status(200).json({book, message:"Book Deleted"}); 
        } else {
            res.status(404).json({ message: "Book not found" }); 
        }
    } catch (error) {
        console.error("Error fetching the book:", error);
        res.status(500).json({ message: "Internal server error" }); 
    }
})

BookRouter.put("/updateBook/:id", async (req, res) => {
    try {
        const bookId = req.params.id; 
        const updateData = req.body; 

        const updatedBook = await updateBookByID(bookId, updateData);

        if (updatedBook) {
            res.status(200).json({
                message: "Book updated successfully",
                data: updatedBook,
            });
        } else {
            res.status(404).json({ message: "Book not found" });
        }
    } catch (error) {
        console.error("Error updating the book:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
