import jwt from "jsonwebtoken";

export const Sign_Access_JWT  = (obj) =>{
    console.log(process.env.ACCESS_SECRET_KEY)
    const token = jwt.sign(obj,process.env.ACCESS_SECRET_KEY,{expiresIn:"1d"})

     return token;
}

export const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    console.log(req.headers);
    

    console.log(2000, token, req.headers);
    
    if (!token) {
      const respObj = {
        status: false,
        message: "Access denied. No Token!",
      };
  
      return res.status(401).send(respObj);
    }
  
    try {
        
      const decoded = jwt.verify(token, process.env.ACCESS_SECRET_KEY);
    console.log(400,decoded);
    
      req.user = decoded;
      next();
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