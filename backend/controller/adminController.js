import { z } from 'zod';
import bcrypt from 'bcrypt'
import { adminModel } from '../models/adminModel.js'
import jwt from 'jsonwebtoken'

export const signup = async (req, res) => {
    const { firstname, lastname, email, password} = req.body;
    //zod validation
    const validSchema = z.object({
        firstname: z.string().min(3, {message: "firstname must be greater than 3 char"}),
        lastname: z.string().min(3, {message: "lastname must be greater than 3 char"}),
        email: z.string().email(),
        password: z.string().min(4, {message: "password must be greater than 4 char"})
    })
    const validate = validSchema.safeParse(req.body);

    try {
        if(!firstname || !lastname || !email || !password) {
            return res.status(400).json({
                message: "All fields are required for signup"
            })
        }
        const user = await adminModel.findOne({
            email: email
        })
        if(user) {
            return res.status(401).json({
                message: "User already exist with this email"
            })
        }
        const hashPass = await bcrypt.hash(password, 10);
        const newUser = await userModel.create({
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: hashPass
        })

        res.status(200).json({
            message: "You are successfully signedup"
        })
    } catch (error) {
        res.status(400).json({
            message: "Error in user signup",
            error: error.message
        })
    }
}

export const signin = async (req, res) => {
    const { email, password } = req.body;
    try {
        if(!email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            })
        }
        const user = await adminModel.findOne({
            email: email
        })
        if(!user) {
            return res.status(402).json({
                message: "User not exist with this email"
            })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(401).json({
                message: "password not match"
            })
        }
        const token = await jwt.sign({
            id: user._id
        }, process.env.JWT_SECRET_ADMIN);

        res.status(200).json({
            message: "User successfully signedin",
            newUser,
            token
        })
    } catch (error) {
        res.status(400).json({
            message: "Error in userSignin"
        })
    }
}