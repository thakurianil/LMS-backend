import express from "express";
import { consoleMiddleWare } from "../middleware/middleware.js";
import { authenticateJWT, Sign_Access_JWT } from "../middleware/authenticate.js";

import { addUser, getUser } from "../models/user/userModel.js";
import { comparePassword, hashPassword } from "../utils/bcrypt.js";

export const UserRouter = express.Router();

UserRouter.post("/", async (req, res) => {
  try {
    req.body.password = hashPassword(req.body.password);

    const user = await addUser(req.body);
    if (user?._id)
      return res.json({
        status: "success",
        message: "Registration Successfull",
        user,
      });
    else
      return res.json({
        status: "error",
        message: "Registration Failed",
      });
  } catch (error) {
    if (error?.code == 11000) {
      return res.json({
        status: "error",
        message: "Duplicate Data",
      });
    }

    return res.json({
      status: "error",
      message: "Something went wrong",
      error,
    });
  }
});

UserRouter.post("/login", consoleMiddleWare, async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await getUser(email);

    if (user?._id) {
      const isPasswordCorrect = comparePassword(password, user.password);

      if (isPasswordCorrect) {
        user.password = undefined;

        const JWToken = Sign_Access_JWT({ userId: user._id, email: email });

        console.log(JWToken);

        res.json({
          status: "success",
          message: "login Success",
          user,
          JWToken,
        });
        return;
      }
    }
    res.status(401).json({
      status: "Error",
      message: "Invalid email or password",
    });
  } catch (error) {
    console.log(error.message);
  }
});

UserRouter.get(
  "/verify",
  consoleMiddleWare,
  authenticateJWT,
  async (req, res) => {
    const respObj = {
      status: "success",
      message: "Verified",
      data: { username: req.user.username, _id: req.user._id },
    };

    return res.status(200).send(respObj);
  }
);
