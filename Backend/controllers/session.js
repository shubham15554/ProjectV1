
import Session from "../models/session.js";
import User from "../models/user.js";
import { createSecretToken } from "../utils/createToken.js";
import bcrypt from "bcrypt";
import  { uuid } from 'uuidv4';

export const booking = async (req , res) => {
    
    try{
     
     let formData = req.body;
     let plan = formData.planType;
     console.log(formData);
     let newSession = new Session(formData);
     let code = uuid();
    if(plan == 'video') newSession.meetingLink = `https://project-v1-338y.vercel.app/vedio/${code}`;
    if(plan == 'chat') newSession.meetingLink = `https://project-v1-338y.vercel.app/chat/${code}`;
    await newSession.save();
     console.log(newSession);
     res.json({message : "Booking confirmed"});
    }catch(e){
        console.log(e);
       res.json({message : "Something went wrong"});
    }
}

export const myBookings = async (req , res) => {

    try{
        const userId = req.user._id;
        let myBookings = await Session.find({userId : userId});
        res.json({myBookings});
        
    }
    catch{
      res.json({message : "something went wrong"});
    }
}



/// for mentor

export const manageBookings = async (req , res) => {

    try{
        const mentorId = req.user._id;
        let bookings = await Session.find({ mentorId: mentorId });
        res.status(200).json({
            success: true,
            count: bookings.length,
            bookings
        });
        
    }
    catch(err){
    console.log(err);
    res.json({message : "something went wrong"});
    }
}