import Joi from "joi";

const STR = Joi.string();
const STR_REQUIRED = STR.required();
const EMAIL = STR.email({ minDomainSegments: 2 }).required();


const loginSchema = Joi.object({
  email: EMAIL,
  password: STR_REQUIRED,
});

const joiValidation = (req,res,next, schema) =>{
    try {
        const { error } = schema.validate(req.body);
    
        if (error) {
          return res
            .status(400)
            .json({ message: "Validation error", details: error.details });
        }
    
        next();
      } catch (error) {
        return res
          .status(500)
          .json({ message: "Server error", error: error.message });
      }  
}

export const loginValidator = (req, res, next) => {
 joiValidation(req,res,next,loginSchema);
};

const signUpSchema = Joi.object({
  fName: STR_REQUIRED,
  lName: STR_REQUIRED,
  password: STR.pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  email: EMAIL,
  phone: STR.allow("",null),
});



export const signUpValidator = (req,res,next)=>{
    joiValidation(req,res,next,signUpSchema);
}

const bookValidationSchema = Joi.object({
    title: Joi.string().required(),
    author: Joi.string().required(),
    isbn: Joi.string().required(),
    imageURL: Joi.string().uri().required(),
    availability: Joi.boolean().optional(),
    summary: Joi.string().required(),
    publishedYear: Joi.number().integer().min(1000).max(new Date().getFullYear()).required(),
  });
  
  export const createBookValidator = (req,res,next)=>{
    joiValidation(req,res,next,bookValidationSchema);
}

const bookUpdateValidationSchema = Joi.object({
    title: Joi.string().optional(),
    author: Joi.string().optional(),
    isbn: Joi.string().optional(), // ISBN cannot be updated but validate if passed
    imageURL: Joi.string().uri().optional(),
    availability: Joi.boolean().optional(),
    summary: Joi.string().optional(),
    publishedYear: Joi.number().integer().min(1000).max(new Date().getFullYear()).optional(),
  });

  export const updateBookValidator = (req,res,next)=>{
    joiValidation(req,res,next,bookUpdateValidationSchema);
}


// export const signUpValidator = (req, res, next) => {
//     try {
//       const { error } = signUpSchema.validate(req.body);
  
//       if (error) {
//         return res
//           .status(400)
//           .json({ message: "Validation error", details: error.details });
//       }
  
//       next();
//     } catch (error) {
//       return res
//         .status(500)
//         .json({ message: "Server error", error: error.message });
//     }
//   };