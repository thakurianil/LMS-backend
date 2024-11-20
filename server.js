import express from "express";
import { connectMongoDB } from "./src/config/mongoConfig.js";
const app = express();
const PORT = process.env.PORT || 8000;
import cors from "cors";
import { UserRouter } from "./src/routes/userRoutes.js";

//config

connectMongoDB()
  .then(() => {
    app.listen(PORT, (error) => {
      error ? console.log(error) : console.log(`server is running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => console.error(error));

/// Middlewares

//Routers
app.use(cors());
app.use(express.json());

app.use("/api/v1/users", UserRouter);

//live server
app.get("/", (req, res) =>{
  res.json({
      status:"Success",
      message: "Hello Server"
  })
})
