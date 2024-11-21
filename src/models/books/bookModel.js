import bookSchema from "./bookSchema.js";

export const addBook = (obj) => {
  return bookSchema(obj).save();
};


export const displayBooks = (page, limit) => {
    return bookSchema.find()
    .skip(limit * (page - 1))
    .limit(limit)
    .sort({ createdAt: -1 });;
}