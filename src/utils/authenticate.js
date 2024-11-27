import jwt from "jsonwebtoken";
import { getUser } from "../models/user/userModel.js";

export const Sign_Access_JWT = (obj) => {
  console.log(process.env.ACCESS_SECRET_KEY);
  const token = jwt.sign(obj, process.env.ACCESS_SECRET_KEY, {
    expiresIn: "1d",
  });

  return token;
};

export const Sign_REFRESH_Access_JWT = (obj) => {
  console.log(process.env.ACCESS_SECRET_KEY);
  const token = jwt.sign(obj, process.env.ACCESS_REFRESH_SECRET_KEY, {
    expiresIn: "30d",
  });

  return token;
};


export const authenticateJWT = async (req, res, next) => {
  
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    const respObj = {
      status: false,
      message: "Access denied. No Token!",
    };

    return res.status(401).send(respObj);
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_SECRET_KEY);
    if (decoded?.email) {
      const userdetail = await getUser(decoded.email);

      req.userInfo = userdetail;
      next();
    } else {
      // invalid token
    }
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      const errObj = {
        status: false,
        message: "Token expired! Pleas log in again.",
      };

      return res.status(401).json(errObj);
    } else {
      const errObj = {
        status: false,
        message: "Invalid Token!",
      };

      return res.status(403).json(errObj);
    }
  }
};

export const isAdmin = async (req, res, next) => {
  if (req.userInfo.role == "admin") {
    next();
  } else {
    const errObj = {
      status: false,
      message: "Unauthorized",
    };

    return res.status(403).json(errObj);
  }
};

export const refreshJWT = async (req,res, next) =>{
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    const respObj = {
      status: false,
      message: "Access denied. No Token!",
    };

    return res.status(401).send(respObj);
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_REFRESH_SECRET_KEY);
    if (decoded?.email) {
      const userdetail = await getUser(decoded.email);

      req.userInfo = userdetail;
      next();
    } else {
      // invalid token
    }
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      const errObj = {
        status: false,
        message: "Token expired! Pleas log in again.",
      };

      return res.status(401).json(errObj);
    } else {
      const errObj = {
        status: false,
        message: "Invalid Token!",
      };

      return res.status(403).json(errObj);
    }
  }
}
