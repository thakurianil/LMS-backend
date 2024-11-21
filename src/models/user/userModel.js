import userSchema from "./userSchema.js";

export const addUser = (obj) => {
  return userSchema(obj).save();
};

export const getUser = (email) => {
  return userSchema.findOne({ email });
};
