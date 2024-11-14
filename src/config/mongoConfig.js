import mongoose from "mongoose";

export const connectMongoDB = async () => {
  return mongoose.connect(process.env.MONGO_URL);

  //   try {
  //     const conn = await mongoose.connect(process.env.MONGO_URL);
  //     console.log(conn);
  //     console.log("mongoDB connected");
  //   } catch (error) {
  //     console.error(error.message);
  //   }
};
