
import User from "../models/user.js";
import { createSecretToken } from "../utils/createToken.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export const login = async (req , res)=>{

    try{

        const {email , password} = req.body;
        if(!email || !password){
            return res.status(400).json({ message: "All fields are required" });
        }
        const user = await User.findOne({email});

        if(!user){
            return res.status(404).json({msg: "User not found"});
        }
        const isPasswordCorrect = await bcrypt.compare(password , user.password);


        let token = createSecretToken(user._id);

        if(isPasswordCorrect) {
            res.cookie("token", token, {
                httpOnly: true,         
                secure: true,           
                sameSite: "none",       
                maxAge: 24 * 60 * 60 * 1000, 
            });

            res.status(201).json({ 
                message: "User logged in successfully", 
                success: true, 
                user 
            });
        }
        else{
            return  res.status(401).json({msg: "Invalid credentials"});
        }

    }
    catch(e){
        console.log(e);
        res.status(500).json({ message: "Server error", error });
    }
}


export const allMentors = async (req, res) => {
    try {
        let mentors = await User.find({ role: "mentor" }).select("-password");
        res.status(200).json({
            success: true,
            count: mentors.length,
            mentors
        });
    }
    catch (err) {
        console.error("All Mentors Error:", err);
        res.status(500).json({ 
            success: false,
            message: "Something went wrong while fetching mentors" 
        });
    }
};