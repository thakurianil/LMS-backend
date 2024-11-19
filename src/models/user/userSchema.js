import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    fName:{
        type: String,
        required: true,
    },
    lName:{
        type: String,
        required: true,
    },

    email:{
        type: String,
        unique: true,
        index: 1,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    role:{
        type: String,
        default: "student",
    },
    phone:{
        type: String,
        default: "",
    },
    refreshJWT:{
        type: String,
        default: "",
    },
},
{
    timestamps:true
}
)

export default mongoose.model("user", UserSchema);