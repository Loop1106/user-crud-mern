import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    image: {
        type: String,
        default: null
    }
})


const User = mongoose.model("User", userSchema);

export default User;