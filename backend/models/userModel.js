import mongoose from 'mongoose';

const userSchema = new mongoose.model({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required:true
    },
    password: {
        type: String,
        required: true
    }
})

export const userModel = mongoose.model("User", userSchema);