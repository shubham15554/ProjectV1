import Session from "../models/session.js";
import User from "../models/user.js";
import { createSecretToken } from "../utils/createToken.js";
import bcrypt from "bcrypt";


export const booking = async (req , res) => {
    
    try{
     console.log("booking req is coming");
     let formData = req.body;
     
     let newSession = new Session(formData);
     await newSession.save();
     console.log(newSession);
     res.json({message : "Booking confirmed"});
    }catch(e){
       res.json({message : "Something went wrong"});
    }
}