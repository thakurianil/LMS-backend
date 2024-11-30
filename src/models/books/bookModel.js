import bookSchema from "./bookSchema.js";

export const addBook = (obj) => {
  return bookSchema(obj).save();
};

export const displayAllBooks = (page, limit) => {
  return bookSchema
    .find()
    .skip(limit * (page - 1))
    .limit(limit)
    .sort({ createdAt: -1 });
};

export const getBooksByID = (id) => {
  return bookSchema.findOne({ _id: id });
};

export const deleteBookByID = (id) => {
  return bookSchema.findByIdAndDelete({ _id: id });
};

export const updateBookByID = async (id, updateData) => {
  console.log("Updating book with ID:", id);
  const updatedBook = await bookSchema.findByIdAndUpdate(id, updateData);
  return updatedBook;
};

export const displayActiveBooks = () => {
  return bookSchema.find({ status: "active" });
};
